import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socketio = openSocket();

class SavedArticles extends Component {
  state = {
    articles: []
  };

  retrieveArticles() {
    axios.get('/api/article')
    .then(response => this.setState({ articles: response.data }))
    .catch(() => {});
  }

  componentWillMount() {
    socketio.on('add', article => {
      let articles = this.state.articles;
      articles.unshift(article);
      this.setState({ articles });
    });
    socketio.on('delete', id => {
      let articles = this.state.articles;
      this.setState({ articles: articles.filter(article => article._id !== id) });
    })
    this.retrieveArticles();
  };

  deleteArticle(id) {
    axios.delete('/api/article/' + id)
    .then(this.retrieveArticles);
  }

  render() {
    return <ul>
      {this.state.articles.map((article, articleIndex) => (
        <li key={article._id} className="box">
          <article className="media">
            <figure className="media-left">
              {!!article.thumbnail && <p className="image is-64x64"><img src={'https://nytimes.com/' + article.thumbnail} alt={article.title} /></p>}
            </figure>
            <div className="media-content">
              <p>
                <a href={article.url}><strong className="is-size-5">{article.title}</strong></a>
                <span className="is-size-7 is-pulled-right">Saved: <span className="has-text-grey">&nbsp;{article.date.replace(/T.+$/, '')}</span></span>
                <br />
                {article.snippet}
              </p>
            </div>
            <div className="media-right">
              <a title="Delete Article" className="delete is-medium" onClick={() => this.deleteArticle(article._id)}> </a>
            </div>
          </article>
        </li>
      ))}
    </ul>;
  }
}

export default SavedArticles;
