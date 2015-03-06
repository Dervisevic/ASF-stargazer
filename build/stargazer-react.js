var getGitHubPromise = function(name) {
  // Github token, see README
  var token = '';
  return qwest.get('https://api.github.com/repos/'+ name +'?access_token='+token, {responseType: 'json'});
};

var Stars = React.createClass({displayName: "Stars",
  getInitialState: function() { return {stargazers: 0}; },
  componentDidMount: function() {
    var that = this;
    getGitHubPromise('Textalk/angular-schema-form').then(function(response){
      var data = JSON.parse(response);
      that.setState({stargazers: data.stargazers_count});
    }).catch(function(e,url){
      console.log(e, url);
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Angular Schema Form Stars"), 
        React.createElement("h1", {className: "stars"}, this.state.stargazers), 
        React.createElement("div", {className: "box"}, 
          React.createElement("h2", null, 1000-this.state.stargazers, " ★ remaining until 1000"), 
          React.createElement(Compare, {user: "formly-js", repo: "angular-formly", compareTo: this.state.stargazers}), 
          React.createElement(Compare, {user: "joshfire", repo: "jsonform", compareTo: this.state.stargazers})
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

React.render(React.createElement(Stars, null), document.getElementById('content'));
