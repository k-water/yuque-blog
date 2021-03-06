'use strict';

const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

let blogConfig = {};

module.exports = (appInfo) => {
  // Get document, or throw exception on error
  try {
    blogConfig = yaml.safeLoad(
      fs.readFileSync(
        path.join(appInfo.baseDir, 'config.yml'),
        'utf8'
      )
    );
  } catch (e) {
    console.log(e);
  }

  const clientViewRoot = path.join(
    appInfo.baseDir, `themes/${blogConfig.theme}`
  );
  const serverViewRoot = path.join(appInfo.baseDir, '/app/view');
  return {
    keys: 'key',
    static: {
      maxAge: 0,
    },
    client: clientViewRoot,
    view: {
      defaultExtension: '.jsx',
      root: `$${serverViewRoot},${clientViewRoot}`,
    },
    isomorphic: {
      babel: {
        plugins: [
          require.resolve('babel-plugin-transform-decorators-legacy'),
        ],
      },
      alias: {
        client: clientViewRoot,
      },
    },
    webpack: {
      custom: {
        configPath: path.join(appInfo.baseDir, 'config/webpack.config.js'),
      },
    },
    blog: blogConfig,
  };
};
