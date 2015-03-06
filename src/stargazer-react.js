var getGitHubPromise = function(name) {
  // Github token, see README
  var token = '';
  return qwest.get('https://api.github.com/repos/'+ name +'?access_token='+token, {responseType: 'json'});
};

var Stars = React.createClass({
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
      <div>
        <h1>Angular Schema Form Stars</h1>
        <h1 className='stars'>{this.state.stargazers}</h1>
        <div className="box">
          <h2>{1000-this.state.stargazers} ★ remaining until 1000</h2>
          <Compare user="formly-js" repo="angular-formly" compareTo={this.state.stargazers} />
          <Compare user="joshfire" repo="jsonform" compareTo={this.state.stargazers} />
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

React.render(<Stars />, document.getElementById('content'));
