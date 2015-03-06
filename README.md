# ASF stargazer

This was just a fun little project for tracking stars on one of our GH projects. It was originally written with angular but
for educational purposes it's now rewritten with [React](https://github.com/facebook/react).

# Setup
Don't forget to run `bower install`.By default stargazer uses the compiled react files, but in index.html you can uncomment the development files instead.

You can add a github access token to avoid API throttling via IP. It's not required, but you can run into the limitation.
You can create a personal access token [here](https://github.com/settings/tokens/new).
The code should paste in to into the top of the source code `src/stargazer-react.js` and/or `build/stargazer-react.js` depending on if you're doing development or production.
