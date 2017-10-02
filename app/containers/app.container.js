import React  from 'react';
import Search from './search';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    };
  }

  // Makes a request to the server (simulated for this tutorial)
  handleSubmit() {
    postRequest(this.state.value);
  }

  // React input update (binding) is manual which
  // makes it rubust. This is how you keep the input box
  // in sync with keystroke inputs
  handleChange(e) {
    // New values are availbale from the event object
    this.setState({value: e.target.value});
  }

  // Container components wrap presentation component
  render() {
    return (
        <Search
          handleSubmit={this.handleSubmit.bind(this)}
          handleChange={this.handleChange.bind(this)}
          searchValue={this.state.value}/>
      );
    }
}

export default AppComponent
