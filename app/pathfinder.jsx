/*global define*/
define([
    '../vendor/react/react.min',
    '../vendor/lodash/lodash.min',
    './grid-component',
    './interface',
    './mediator'
],

function wrapper(React, _, Grid, Interface, Mediator) {

    var Pathfinder = React.createClass({

        getInitialState: function () {
            return {
                size: 21,
            }
        },

        componentWillMount: function () {
            console.log('cwm');
            document.getElementById('btn').addEventListener('click', function () {
                this.setState(function (s, p) {
                    return {size: s.size + 1};
                });
                console.log('clicked', this.state);
            }.bind(this));
        },

        render: function () {
            console.log('pathfinder render', this.state.size);
            return (
                    <div>
                    <Grid size={this.state.size}/>
                    <Interface />
                    </div>
            );
        }
    })

    return Pathfinder;

})
