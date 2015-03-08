// Returns a promise with the response for the API request.
var getGitHubPromise = function(name) {
  var tokenString = config.token.length > 0 ? '?access_token='+config.token : '';
  return qwest.get('https://api.github.com/repos/'+ name + tokenString, {responseType: 'json'});
};

var Stars = React.createClass({
  getInitialState: function() { return {stargazers: 0}; },
  componentDidMount: function() {
    var that = this;
    getGitHubPromise(this.props.user + '/' + this.props.repo).then(function(response){
      var data = JSON.parse(response);
      that.setState({stargazers: data.stargazers_count});
    }).catch(function(e,url){
      console.log(e, url);
    });
  },
  render: function() {
    var compare = [];
    var that = this;
    config.compare.forEach(function(elem) {
      compare.push(<Compare user={elem.user} repo={elem.repo} compareTo={that.state.stargazers}/>);
    });
    return (
      <div>
        <h1>{this.props.repo}</h1>
        <h1 className='stars'>{this.state.stargazers}</h1>
        <div className="box">
          <h2>{parseInt(this.props.goal)-this.state.stargazers} ★ remaining until {this.props.goal}</h2>
          {compare}
        </div>

      </div>
    );
  }
});

var Compare = React.createClass({
  getInitialState: function() { return {stargazers: 0}; },
  componentDidMount: function() {
    var that = this;
    getGitHubPromise(this.props.user + '/' + this.props.repo).then(function(response){
      var data = JSON.parse(response);
      that.setState({stargazers: data.stargazers_count});
    }).catch(function(e,url){
      console.log(e, url);
    });
  },
  render: function() {
    return (
      <h2>{this.state.stargazers-this.props.compareTo} ★ from {this.props.repo}</h2>
    );
  }
});

React.render(
  <Stars user={config.source.user} repo={config.source.repo} goal={config.source.goal} />,
  document.getElementById('content')
);
