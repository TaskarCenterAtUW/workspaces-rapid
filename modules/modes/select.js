import { select as d3_select } from 'd3-selection';
import {
    utilArrayIntersection, utilArrayUnion, utilDeepMemberSelector,
    utilEntityOrDeepMemberSelector, utilEntitySelector
} from '@id-sdk/util';

import { t } from '../core/localizer';
import { locationManager } from '../core/locations';
import { actionAddMidpoint } from '../actions/add_midpoint';
import { actionDeleteRelation } from '../actions/delete_relation';
//import { behaviorLasso } from '../behaviors/lasso';
//import { BehaviorHover } from '../behaviors/BehaviorHover';
//import { BehaviorPaste } from '../behaviors/BehaviorPaste';
//import { BehaviorSelect } from '../behaviors/BehaviorSelect';
import { geoChooseEdge } from '../geo';
import { modeDragNode } from './drag_node';
import { modeDragNote } from './drag_note';
import { osmNode, osmWay } from '../osm';
import * as Operations from '../operations/index';
import { uiCmd } from '../ui/cmd';
import { utilKeybinding, utilTotalExtent } from '../util';


export function modeSelect(context, selectedIDs) {
    var mode = {
        id: 'select',
        button: 'browse'
    };

    var keybinding = utilKeybinding('select');

    var _modeDragNode = modeDragNode(context);
    // var _selectBehavior;
    // var _behaviors = [];

    var _operations = [];
    var _newFeature = false;
    var _follow = false;

    // `_focusedParentWayId` is used when we visit a vertex with multiple
    // parents, and we want to remember which parent line we started on.
    var _focusedParentWayId;
    var _focusedVertexIds;


    function singular() {
        if (selectedIDs && selectedIDs.length === 1) {
            return context.hasEntity(selectedIDs[0]);
        }
    }

    function selectedEntities() {
        return selectedIDs.map(function(id) {
            return context.hasEntity(id);
        }).filter(Boolean);
    }


    function checkSelectedIDs() {
        var ids = [];
        if (Array.isArray(selectedIDs)) {
            ids = selectedIDs.filter(function(id) {
                var entity = context.hasEntity(id);
                if (!entity) return false;
                if (entity.type === 'node' && locationManager.blocksAt(entity.loc).length) return false;
                return true;
            });
        }

        if (!ids.length) {
            context.enter('browse');
            return false;
        } else if ((selectedIDs.length > 1 && ids.length === 1) || (selectedIDs.length === 1 && ids.length > 1)) {
            // switch between single- and multi-select UI
            context.enter(modeSelect(context, ids));
            return false;
        }

        selectedIDs = ids;
        return true;
    }


    // find the parent ways for nextVertex, previousVertex, and selectParent
    function parentWaysIdsOfSelection(onlyCommonParents) {
        var graph = context.graph();
        var parents = [];

        for (var i = 0; i < selectedIDs.length; i++) {
            var entity = context.hasEntity(selectedIDs[i]);
            if (!entity || entity.geometry(graph) !== 'vertex') {
                return [];  // selection includes some non-vertices
            }

            var currParents = graph.parentWays(entity).map(function(w) { return w.id; });
            if (!parents.length) {
                parents = currParents;
                continue;
            }

            parents = (onlyCommonParents ? utilArrayIntersection : utilArrayUnion)(parents, currParents);
            if (!parents.length) {
                return [];
            }
        }

        return parents;
    }

    // find the child nodes for selected ways
    function childNodeIdsOfSelection(onlyCommon) {
        var graph = context.graph();
        var childs = [];

        for (var i = 0; i < selectedIDs.length; i++) {
            var entity = context.hasEntity(selectedIDs[i]);

            if (!entity || !['area', 'line'].includes(entity.geometry(graph))){
                return [];  // selection includes non-area/non-line
            }
            var currChilds = graph.childNodes(entity).map(function(node) { return node.id; });
            if (!childs.length) {
                childs = currChilds;
                continue;
            }

            childs = (onlyCommon ? utilArrayIntersection : utilArrayUnion)(childs, currChilds);
            if (!childs.length) {
                return [];
            }
        }

        return childs;
    }

    function checkFocusedParent() {
        if (_focusedParentWayId) {
            var parents = parentWaysIdsOfSelection(true);
            if (parents.indexOf(_focusedParentWayId) === -1) _focusedParentWayId = null;
        }
    }


    function parentWayIdForVertexNavigation() {
        var parentIds = parentWaysIdsOfSelection(true);

        if (_focusedParentWayId && parentIds.indexOf(_focusedParentWayId) !== -1) {
            // prefer the previously seen parent
            return _focusedParentWayId;
        }

        return parentIds.length ? parentIds[0] : null;
    }


    mode.selectedIDs = function(val) {
        if (!arguments.length) return selectedIDs;
        selectedIDs = val;
        return mode;
    };


    mode.zoomToSelected = function() {
        context.map().zoomToEase(selectedEntities());
    };


    mode.newFeature = function(val) {
        if (!arguments.length) return _newFeature;
        _newFeature = val;
        return mode;
    };


    mode.selectBehavior = () =>  {
      console.error('error: do not call modeSelect.selectBehavior anymore'); // eslint-disable-line no-console
    };
    // mode.selectBehavior = function(val) {
    //     if (!arguments.length) return _selectBehavior;
    //     _selectBehavior = val;
    //     return mode;
    // };


    mode.follow = function(val) {
        if (!arguments.length) return _follow;
        _follow = val;
        return mode;
    };


    function loadOperations() {
      _operations.forEach(o => {
        if (o.behavior) {
          o.behavior.disable();
        }
      });

      _operations = Object.values(Operations)
        .map(o => o(context, selectedIDs))
        .filter(o => (o.id !== 'delete' && o.id !== 'downgrade' && o.id !== 'copy'))
        .concat([
            // group copy/downgrade/delete operation together at the end of the list
            Operations.operationCopy(context, selectedIDs),
            Operations.operationDowngrade(context, selectedIDs),
            Operations.operationDelete(context, selectedIDs)
          ])
        .filter(o => o.available());

      _operations.forEach(o => {
        if (o.behavior) {
          o.behavior.enable();
        }
      });

      // remove any displayed menu
      context.ui().closeEditMenu();
    }

    mode.operations = function() {
        return _operations;
    };


    mode.enter = function() {
        if (!checkSelectedIDs()) return false;

        context.features().forceVisible(selectedIDs);

        _modeDragNode.restoreSelectedIDs(selectedIDs);

        loadOperations();

      context.enableBehaviors(['hover', 'select', 'drag']);

        // if (!_behaviors.length) {
        //     if (!_selectBehavior) _selectBehavior = new BehaviorSelect(context);

        //     _behaviors = [
        //         new BehaviorHover(context),
        //         new BehaviorPaste(context),
        //         _selectBehavior,
        //         behaviorLasso(context),
        //         _modeDragNode.behavior,
        //         // modeDragNote(context).behavior
        //     ];
        // }
        // _behaviors.forEach(context.install);

        keybinding
            .on(t('inspector.zoom_to.key'), mode.zoomToSelected)
            .on(['[', 'pgup'], previousVertex)
            .on([']', 'pgdown'], nextVertex)
            .on(['{', uiCmd('⌘['), 'home'], firstVertex)
            .on(['}', uiCmd('⌘]'), 'end'], lastVertex)
            .on(['\\', 'pause'], focusNextParent)
            .on(uiCmd('⌘↑'), selectParent)
            .on(uiCmd('⌘↓'), selectChild)
            .on('⎋', esc, true);

        d3_select(document)
            .call(keybinding);

        context.ui().sidebar
            .select(selectedIDs, _newFeature);

        context.history()
            .on('change.select', function() {
                loadOperations();
                // reselect after change in case relation members were removed or added
                selectElements();
            })
            .on('undone.select', checkSelectedIDs)
            .on('redone.select', checkSelectedIDs);

        context.map()
            .on('drawn.select', selectElements);

//        context.map().doubleUpHandler()
//            .on('doubleUp.modeSelect', didDoubleUp);


        selectElements();

        if (_follow) {
            var extent = utilTotalExtent(selectedIDs, context.graph());
            var loc = extent.center();
            context.map().centerEase(loc);
            // we could enter the mode multiple times, so reset follow for next time
            _follow = false;
        }

        return true;

//        function didDoubleUp(d3_event, loc) {
//            var target = d3_select(d3_event.target);
//
//            var datum = target.datum();
//            var entity = datum && datum.properties && datum.properties.entity;
//            if (!entity) return;
//
//            if (entity instanceof osmWay && target.classed('target')) {
//                var choice = geoChooseEdge(context.graph().childNodes(entity), loc, context.projection);
//                var prev = entity.nodes[choice.index - 1];
//                var next = entity.nodes[choice.index];
//
//                context.perform(
//                    actionAddMidpoint({ loc: choice.loc, edge: [prev, next] }, osmNode()),
//                    t('operations.add.annotation.vertex')
//                );
//                context.validator().validate();
//
//            } else if (entity.type === 'midpoint') {
//                context.perform(
//                    actionAddMidpoint({ loc: entity.loc, edge: entity.edge }, osmNode()),
//                    t('operations.add.annotation.vertex')
//                );
//                context.validator().validate();
//            }
//        }


        function selectElements() {
            if (!checkSelectedIDs()) return;

            var surface = context.surface();

            surface.selectAll('.selected-member')
                .classed('selected-member', false);

            surface.selectAll('.selected')
                .classed('selected', false);

            surface.selectAll('.related')
                .classed('related', false);

            // reload `_focusedParentWayId` based on the current selection
            checkFocusedParent();
            if (_focusedParentWayId) {
                surface.selectAll(utilEntitySelector([_focusedParentWayId]))
                    .classed('related', true);
            }

            // if (context.map().withinEditableZoom()) {
                // Apply selection styling if not in wide selection

                surface
                    .selectAll(utilDeepMemberSelector(selectedIDs, context.graph(), true /* skipMultipolgonMembers */))
                    .classed('selected-member', true);
                surface
                    .selectAll(utilEntityOrDeepMemberSelector(selectedIDs, context.graph()))
                    .classed('selected', true);
            // }

        }


        function esc() {
            if (context.container().select('.combobox').size()) return;
            context.enter('browse');
        }


        function firstVertex(d3_event) {
            d3_event.preventDefault();
            var entity = singular();
            var parentId = parentWayIdForVertexNavigation();
            var way;

            if (entity && entity.type === 'way') {
                way = entity;
            } else if (parentId) {
                way = context.entity(parentId);
            }
            _focusedParentWayId = way && way.id;

            if (way) {
                context.enter(
                    mode.selectedIDs([way.first()])
                        .follow(true)
                );
            }
        }


        function lastVertex(d3_event) {
            d3_event.preventDefault();
            var entity = singular();
            var parentId = parentWayIdForVertexNavigation();
            var way;

            if (entity && entity.type === 'way') {
                way = entity;
            } else if (parentId) {
                way = context.entity(parentId);
            }
            _focusedParentWayId = way && way.id;

            if (way) {
                context.enter(
                    mode.selectedIDs([way.last()])
                        .follow(true)
                );
            }
        }


        function previousVertex(d3_event) {
            d3_event.preventDefault();
            var parentId = parentWayIdForVertexNavigation();
            _focusedParentWayId = parentId;
            if (!parentId) return;

            var way = context.entity(parentId);
            var length = way.nodes.length;
            var curr = way.nodes.indexOf(selectedIDs[0]);
            var index = -1;

            if (curr > 0) {
                index = curr - 1;
            } else if (way.isClosed()) {
                index = length - 2;
            }

            if (index !== -1) {
                context.enter(
                    mode.selectedIDs([way.nodes[index]])
                        .follow(true)
                );
            }
        }


        function nextVertex(d3_event) {
            d3_event.preventDefault();
            var parentId = parentWayIdForVertexNavigation();
            _focusedParentWayId = parentId;
            if (!parentId) return;

            var way = context.entity(parentId);
            var length = way.nodes.length;
            var curr = way.nodes.indexOf(selectedIDs[0]);
            var index = -1;

            if (curr < length - 1) {
                index = curr + 1;
            } else if (way.isClosed()) {
                index = 0;
            }

            if (index !== -1) {
                context.enter(
                    mode.selectedIDs([way.nodes[index]])
                        .follow(true)
                );
            }
        }


        function focusNextParent(d3_event) {
            d3_event.preventDefault();
            var parents = parentWaysIdsOfSelection(true);
            if (!parents || parents.length < 2) return;

            var index = parents.indexOf(_focusedParentWayId);
            if (index < 0 || index > parents.length - 2) {
                _focusedParentWayId = parents[0];
            } else {
                _focusedParentWayId = parents[index + 1];
            }

            var surface = context.surface();
            surface.selectAll('.related')
                .classed('related', false);

            if (_focusedParentWayId) {
                surface.selectAll(utilEntitySelector([_focusedParentWayId]))
                    .classed('related', true);
            }
        }

        function selectParent(d3_event) {
            d3_event.preventDefault();

            var currentSelectedIds = mode.selectedIDs();
            var parentIds = _focusedParentWayId ? [_focusedParentWayId] : parentWaysIdsOfSelection(false);
            if (!parentIds.length) return;

            context.enter(
                mode.selectedIDs(parentIds)
            );
            // set this after re-entering the selection since we normally want it cleared on exit
            _focusedVertexIds = currentSelectedIds;
        }

        function selectChild(d3_event) {
            d3_event.preventDefault();

            var currentSelectedIds = mode.selectedIDs();

            var childIds = _focusedVertexIds ? _focusedVertexIds.filter(id => context.hasEntity(id)) : childNodeIdsOfSelection(true);
            if (!childIds || !childIds.length) return;

            if (currentSelectedIds.length === 1) _focusedParentWayId = currentSelectedIds[0];

            context.enter(
                mode.selectedIDs(childIds)
            );
        }
    };


    mode.exit = function() {

        // we could enter the mode multiple times but it's only new the first time
        _newFeature = false;

        _focusedVertexIds = null;

        _operations.forEach(o => {
          if (o.behavior) {
            o.behavior.disable();
          }
        });
        _operations = [];


        // _behaviors.forEach(context.uninstall);

        d3_select(document)
            .call(keybinding.unbind);

        context.ui().closeEditMenu();

        context.history()
            .on('change.select', null)
            .on('undone.select', null)
            .on('redone.select', null);

        var surface = context.surface();

        surface
            .selectAll('.selected-member')
            .classed('selected-member', false);

        surface
            .selectAll('.selected')
            .classed('selected', false);

        surface
            .selectAll('.highlighted')
            .classed('highlighted', false);

        surface
            .selectAll('.related')
            .classed('related', false);

        context.map().on('drawn.select', null);
        context.ui().sidebar.hide();
        context.features().forceVisible([]);

        var entity = singular();
        if (_newFeature && entity && entity.type === 'relation' &&
            // no tags
            Object.keys(entity.tags).length === 0 &&
            // no parent relations
            context.graph().parentRelations(entity).length === 0 &&
            // no members or one member with no role
            (entity.members.length === 0 || (entity.members.length === 1 && !entity.members[0].role))
        ) {
            // the user added this relation but didn't edit it at all, so just delete it
            var deleteAction = actionDeleteRelation(entity.id, true /* don't delete untagged members */);
            context.perform(deleteAction, t('operations.delete.annotation.relation'));
            context.validator().validate();
        }
    };


    return mode;
}
