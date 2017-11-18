import React, { Component } from 'react';
import axios from 'axios';
import Field from './form/Field';
import Container from './Container';
import Results from './Results';
// import dummyData from '../dummyData.json';

const currentYear = (new Date()).getFullYear();
var years = [];
for (let i = 1851; i <= currentYear; i++) {
  years.unshift(i);
}

class Search extends Component {
  state = {
    query: '',
    beginDate: (currentYear - 3),
    endDate: currentYear,
    articles: [], // dummyData,
    loading: false
  };

  saveArticle = article => {
    let thumbnail = article.multimedia.filter(media => media.subtype === 'thumbnail').map(media => media.url)[0];
    return axios.post('/api/article', { title: article.headline.main, snippet: article.snippet, url: article.web_url, thumbnail });
  };

  search = event => {
    this.setState({ loading: true });
    event.preventDefault();
    axios.get(`/api/search?q=${this.state.query}&begin_date=${this.state.beginDate}0101&end_date=${this.state.endDate}1231`)
    .then(results => {
      this.setState({ articles: results.data.response.docs, loading: false });
    })
    .catch(error => console.error(error));
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Container title="Search">
          <form onSubmit={this.search} >
            <Field placeholder="Topic" label="Topic" autoFocus type="search" onChange={this.handleInputChange} name="query" />
            <div className="field is-grouped is-pulled-left">
              <label className="control">
                <h3 className="label">From</h3>
                <div className="select">
                  <select value={this.state.beginDate} onChange={this.handleInputChange} name="beginDate">
                    { years.map(year => <option key={year} value={year}>{year}</option>) }
                  </select>
                </div>
              </label>
              <label className="control">
                <h3 className="label">To</h3>
                <div className="select">
                  <select value={this.state.endDate} onChange={this.handleInputChange} name="endDate">
                    { years.map(year => <option key={year} value={year}>{year}</option>) }
                  </select>
                </div>
              </label>
            </div>
            <Field className="control is-pulled-right">
              <button type="submit" className={'button is-info is-large' + (this.state.loading ? ' is-loading' : '')}>
                <span>Search</span>
                <span className="icon">
                  <i className="material-icons">search</i>
                </span>
              </button>
            </Field>
          </form>
        </Container>
        { !!this.state.articles.length && <Container title="Results">
          <Results articles={this.state.articles} save={this.saveArticle} />
        </Container>}
      </div>
    );
  }
}

export default Search;
