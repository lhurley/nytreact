import React, { Component } from 'react';

class Results extends Component {
  state = {
    loading: [],
    failed: [],
    success: []
  };

  save(article, articleIndex) {
    let loading = [];
    loading[articleIndex] = true;
    this.setState({ loading });
    this.props.save(article)
    .then(() => {
      this.setState({ success: loading, loading: [] });
      setTimeout(() => this.setState({ success: [] }), 1300);
    })
    .catch(() => {
      this.setState({ failed: loading, loading: [] });
      setTimeout(() => this.setState({ failed: [] }), 1300);
    });
  }

  statusIcon(articleIndex) {
    switch(true) {
      case this.state.success[articleIndex]:
        return 'done';
      case this.state.failed[articleIndex]:
        return 'report_problem';
      default:
        return 'note_add';
    }
  }

  render() {
    return <ul>
      {this.props.articles.map((article, articleIndex) => (
        <li key={article._id} className="box">
          <article className="media">
            <figure className="media-left">
                {article.multimedia.filter(media => media.subtype === 'thumbnail').map(media => (
                  <p className="image is-64x64" key={media.url}><img src={'https://nytimes.com/' + media.url} alt={article.headline.main} /></p>
                ))}
            </figure>
            <div className="media-content">
              <p>
                <a href={article.web_url}><strong className="is-size-5">{article.headline.main}</strong></a>
                <span className="is-size-7 has-text-grey is-pulled-right">&nbsp;{article.pub_date.replace(/T.+$/, '')}</span>
                <br />
                {article.snippet}
              </p>
            </div>
            <div className="media-right">
              <a className={'button' + (this.state.failed[articleIndex] ? ' is-danger' : ' is-success') + (this.state.loading[articleIndex] ? ' is-loading' : '')} title="Save Article" onClick={() => this.save(article, articleIndex)}>
                <span className="icon">
                  <i className="material-icons">{this.statusIcon(articleIndex)}</i>
                </span>
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>;
  }
}

export default Results;
