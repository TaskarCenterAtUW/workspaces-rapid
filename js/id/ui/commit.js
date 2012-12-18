iD.commit = function() {
    var event = d3.dispatch('cancel', 'save');

    function commit(selection) {
        var changes = selection.datum(),
            header = selection.append('div').attr('class', 'header pad1'),
            body = selection.append('div').attr('class', 'body');

        header.append('h2').text('Upload Changes to OpenStreetMap');
        header.append('p').text('the changes you upload will be visible on all maps using OpenStreetMap data');

        var section = body.selectAll('div.commit-section')
            .data(['modified', 'deleted', 'created'].filter(function(d) {
                return changes[d].length;
            }))
            .enter()
            .append('div').attr('class', 'commit-section pad1');

        section.append('h3').text(String)
            .append('small')
            .attr('class', 'count')
            .text(function(d) { return changes[d].length; });

        var li = section.append('ul')
            .attr('class','changeset-list')
            .selectAll('li')
            .data(function(d) { return changes[d]; })
            .enter()
            .append('li');

        li.append('strong').text(function(d) { return d.type + ' '; });
        li.append('span')
            .text(function(d) {
                 return iD.util.friendlyName(d);
            })
            .attr('title', iD.util.tagText);

        body.append('div').attr('class','pad1')
                .append('textarea')
                .attr('class', 'changeset-comment pad1')
                .attr('placeholder', 'Brief Description');

        var buttonwrap = body.append('div')
                            .attr('class', 'buttons');

        var savebutton = buttonwrap.append('button')
            .attr('class', 'action wide')
            .on('click.save', function() {
                event.save({
                    comment: d3.select('textarea.changeset-comment').node().value
                });
            });
            savebutton.append('span').attr('class','icon save icon-pre-text')
            savebutton.append('span').attr('class','label').text('Save')
        var cancelbutton = buttonwrap.append('button')
            .attr('class', 'cancel wide')
            .on('click.cancel', function() {
                event.cancel();
            });
            cancelbutton.append('span').attr('class','icon close icon-pre-text')
            cancelbutton.append('span').attr('class','label').text('Cancel')
    }

    return d3.rebind(commit, event, 'on');
};
