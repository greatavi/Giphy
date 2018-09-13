import React, { Component } from 'react';
import './App.css';
import SearchBox from './SearchBox';
import GifLayout from './GifLayout';
import { debounce } from 'lodash';

class App extends Component {
  constructor(){
    super();

    this.state = {
      query : "",
      queryChange: false,
      offset: 0,
      fetchingMoreResults: false,
      apiData : []
    };

    this.API_KEY = "a2IZkoH2v4yVbhutVjwqHM7qceGAOaK7";
    this.image_limit = 30;

    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.getSearchGifs = this.getSearchGifs.bind(this);
    this.getTrendingGifs = this.getTrendingGifs.bind(this);
    this.handleLoadMoreData = this.handleLoadMoreData.bind(this);
  }
  handleLoadMoreData(){
      this.setState({
        fetchingMoreResults: true,
        queryChange: false
      },()=>{ this.searchAfterUserStoppedTyping() })
    }

  onChangeEvent(event){
    this.setState({
      query: event.target.value,
      queryChange: true,
      apiData : []
    },()=>{ this.searchAfterUserStoppedTyping() });
  }
  componentDidMount(){
    this.getTrendingGifs(this.state.offset);
  }
  searchAfterUserStoppedTyping = debounce(() => {
        if(this.state.query && this.state.query.length!==0){
          this.getSearchGifs(this.state.query, this.state.offset);
        }else{
          this.getTrendingGifs(this.state.offset);
        }
        console.log("call the api search");
      }, 300);

  getTrendingGifs(offset){
    fetch(`https://api.giphy.com/v1/gifs/trending?&api_key=${this.API_KEY}&limit=${this.image_limit}&offset=${offset}`)
        .then(res => res.json())
        .then(json => this.setState({
          apiData : this.state.queryChange? json.data : this.state.apiData.concat(json.data),
          offset : this.state.offset + this.image_limit
        }));
  }
  getSearchGifs(query, offset){
    console.log("fetching Data",this.state.query);
    fetch(`https://api.giphy.com/v1/gifs/search?&api_key=${this.API_KEY}&limit=${this.image_limit}&offset=${offset}&q=${query}`)
      .then(res => res.json())
      .then(json => this.setState({
          apiData : this.state.queryChange? json.data : this.state.apiData.concat(json.data),
          offset : this.state.offset + this.image_limit
        }));
  }
  render() {
    let showLoadMoreCss = this.state.apiData.length >0 ? "show":"hide";
    let notFoundCss = this.state.apiData.length ===0 ? "show":"hide";
    return (
      <div className="App">
        <SearchBox changeHandler={this.onChangeEvent} inputValue = {this.state.query} placeHolderText = "Search" enableAutoFocus = {true}/>
        <GifLayout apiData = {this.state.apiData}/>
        <button id = "load-more-btn" className = {showLoadMoreCss} onClick = {this.handleLoadMoreData}>Load More</button>
        <h2 id = "no-results" className = {notFoundCss}>No Results Found</h2>
      </div>
    );
  }
}

export default App;
