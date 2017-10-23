import React, { PureComponent } from 'react';


class Details extends PureComponent {
  // Render
  render(){
    return(
      <div className="details">
        <h3>{this.props.title}</h3>
      </div>
    )
  }

}
// Export
export default Details
