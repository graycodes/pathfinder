var React = require('react');
var _ = require('lodash');
var redux = require('redux');
var Grid = require('./grid-component.jsx');
var Interface = require('./interface.jsx');


var Pathfinder = React.createClass({

    render: function () {
        return (
                <div>
	                <Interface actions={this.props.actions} />
                    <div className="main">
    	                <Grid size={this.props.size} walls={this.props.walls} path={this.props.path} steps={this.props.steps} actions={this.props.actions} finalPath={this.props.finalPath} />
                        <p className="instructions">
                            <strong>Click on the grid to place "walls" which the app will have to
                            navigate around<br/>
                            <br/>
                            When you have placed the walls, hit Find Path above to run the app.</strong><br/>
                            <br/>
                            The application will find *all* the shortest paths from the left hand blue
                            square to the right hand blue square. There may be multiple shortest paths.<br/>
                            <br/>
                            The algorithm only moves up, down, left or right and not diagonally.<br/>
                            <br/>
                            The route will be highlighted in bright sequential colours. If a large
                            area appears to be filled in, there may be many available paths.
                        </p>
                    </div>
                </div>
        );
    }
})

module.exports = Pathfinder;
