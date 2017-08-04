import React from 'react'
import Common from './routerMap/common'
export default React.createClass({
  render() {
    return (
      <div>
        <Common />
        {this.props.children || <Home />}
      </div >
    )
  }
})
