import React from 'react';
export default React.createClass({
    render() {
        return (
            <h1>This is {this.props.params.repoName}!</h1 >
        );
    }
})

