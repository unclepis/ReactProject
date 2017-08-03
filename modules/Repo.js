import React from 'react';
import {browserHistory} from 'react-router';
export default React.createClass({
    backHome:function(e){
        e.preventDefault();
        browserHistory.push('/');
    },
    render() {
        return (
            <div>
                <h1>This is {this.props.params.repoName}!</h1 >
                <button onClick = {this.backHome}>Back to Home</button>
            </div>
        );
    }
})

