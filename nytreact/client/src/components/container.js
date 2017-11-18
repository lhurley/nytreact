import React, { Component } from 'react';

class Container extends Component {
  render() {
    return (
      <section className={this.props.sectionClass || 'section'}>
        <div className={this.props.divClass || 'container'}>
          {this.props.title && <h1 className="title is-size-4">{this.props.title}</h1>}
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default Container;
