import { services } from '../services';
import { PixiLayer } from './PixiLayer';
import { PixiFeaturePoint } from './PixiFeaturePoint';

const LAYERID = 'notes';
const LAYERZINDEX = 10;
const MINZOOM = 12;


/**
 * PixiLayerOsmNotes
 * @class
 */
export class PixiLayerOsmNotes extends PixiLayer {

  /**
   * @constructor
   * @param context
   * @param scene
   * @param dispatch
   */
  constructor(context, scene, dispatch) {
    super(context, LAYERID, LAYERZINDEX);

    this.scene = scene;
    this.dispatch = dispatch;

    this._service = null;
    this.getService();

// might use these
//    const markerHighlight = new PIXI.Graphics()
//      .lineStyle(4, 0xcccccc, 0.6)
//      .moveTo(-1, -1)
//      .lineTo(-1, 17.25)
//      .lineTo(18.5, 17.25)
//      .lineTo(18.5, -1)
//      .closePath();
//
//    const ellipse = new PIXI.Graphics()
//      .lineStyle(1, 0x222222, 0.6)
//      .beginFill(0x222222, 0.6)
//      .drawEllipse(0.5, 1, 6.5, 3)
//      .endFill();
  }


  /**
   * Services are loosely coupled in iD, so we use a `getService` function
   * to gain access to them, and bind any event handlers a single time.
   */
  getService() {
    if (services.osm && !this._service) {
      this._service = services.osm;
      // this._service.on('loadedNotes', throttledRedraw);
    } else if (!services.osm && this._service) {
      this._service = null;
    }

    return this._service;
  }


  /**
   * drawMarkers
   * @param projection - a pixi projection
   * @param zoom - the effective zoom to use for rendering
   */
  drawMarkers(projection, zoom) {
    const context = this.context;
    const scene = this.scene;

    const service = this.getService();
    if (!service) return;

    const visibleData = service.notes(context.projection);

    visibleData.forEach(d => {
      const featureID = `${LAYERID}-${d.id}`;
      let feature = scene.get(featureID);

      if (!feature) {
        let color = 0xff3300;  // open (red)
        // let iconName = '#iD-icon-close'
        if (d.status === 'closed') {
          color = 0x55dd00;  // closed (green)
          // iconName = '#iD-icon-apply'
        }
        if (d.isNew()) {
          color = 0xffee00;  // new (yellow)
          // iconName = '#iD-icon-plus'
        }

        const markerStyle = {
          markerName: 'osmnote',
          markerTint: color
          // iconName: iconName
        };
        feature = new PixiFeaturePoint(context, featureID, d.loc, [], markerStyle);

        // bind data and add to scene
        const dObj = feature.displayObject;
        dObj.__data__ = d;
        this.container.addChild(dObj);
      }

      if (feature.needsUpdate(projection)) {
        feature.update(projection, zoom);
        scene.update(feature);
      }
    });
  }


  /**
   * render
   * Draw any data we have, and schedule fetching more of it to cover the view
   * @param projection - a pixi projection
   * @param zoom - the effective zoom to use for rendering
   */
  render(projection, zoom) {
    if (!this._enabled) return;

    const context = this.context;
    const service = this.getService();

    if (service && zoom >= MINZOOM) {
      this.visible = true;
      service.loadNotes(context.projection);  // note: context.projection !== pixi projection
      this.drawMarkers(projection, zoom);
    } else {
      this.visible = false;
    }
  }


  /**
   * supported
   * Whether the layer's service exists
   */
  get supported() {
    return !!this.getService();
  }

}

