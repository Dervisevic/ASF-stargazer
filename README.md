# ASF stargazer

This was just a fun little project for tracking stars on one of our GH projects. It was originally written with angular but
for educational purposes it's now rewritten with [React](https://github.com/facebook/react).

# Setup
1. `bower install`
2. Edit `config.js` to fit your needs.

You may add a github access token to avoid API throttling via IP. It's **not required**, but you can run into the limitation.
You can create a personal access token [here](https://github.com/settings/tokens/new). Just paste it into the config.

Note: By default stargazer uses the compiled react files, but in index.html you can uncomment the development files if you wish.
