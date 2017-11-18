import React, { Component } from 'react';

class Field extends Component {
  render() {
    return (
      <div className={this.props.className || 'field'}>
        <label className="control">
          <h3 className="label">{this.props.label}</h3>
          {this.props.children ||
            <input {...this.props} className="input" type={this.props.type || 'text'} />
          }
        </label>
      </div>
    );
  }
}

export default Field;
