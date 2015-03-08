// Returns a promise with the response for the API request.
var getGitHubPromise = function(name) {
  var tokenString = config.token.length > 0 ? '?access_token='+config.token : '';
  return qwest.get('https://api.github.com/repos/'+ name + tokenString, {responseType: 'json'});
};

var Stars = React.createClass({displayName: "Stars",
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
      compare.push(React.createElement(Compare, {user: elem.user, repo: elem.repo, compareTo: that.state.stargazers}));
    });
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, this.props.repo), 
        React.createElement("h1", {className: "stars"}, this.state.stargazers), 
        React.createElement("div", {className: "box"}, 
          React.createElement("h2", null, parseInt(this.props.goal)-this.state.stargazers, " ★ remaining until ", this.props.goal), 
          compare
        )

      )
    );
  }
});

var Compare = React.createClass({displayName: "Compare",
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
      React.createElement("h2", null, this.state.stargazers-this.props.compareTo, " ★ from ", this.props.repo)
    );
  }
});

React.render(
  React.createElement(Stars, {user: config.source.user, repo: config.source.repo, goal: config.source.goal}),
  document.getElementById('content')
);
