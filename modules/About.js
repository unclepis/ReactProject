import React from 'react';
export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    submit: function (e) {
        e.preventDefault();
        const path = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        if (password === '000') {
            this.context.router.push(`/${path}`);
        } else {
            alert('password error');
        }
    },
    render() {
        return (
            <div>
                <h1>This is New About single Page!</h1 >
                <form onSubmit={this.submit}>
                    <input type='text' placeholder='path' /><br />
                    <input type='password' placeholder='passWord' /><br />
                    <input type='submit' value='submit' />
                </form>
            </div>
        );
    }
})

