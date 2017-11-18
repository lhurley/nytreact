import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navtabs extends Component {
  render() {
    return (
      <div className="tabs is-centered">
        <ul>
          { this.props.tabs.map(tab => <li key={tab.path}><Link to={tab.path}>{tab.name}</Link></li>) }
        </ul>
      </div>
    );
  }
}

export default Navtabs;
