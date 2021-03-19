/* eslint-disable */
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules')([
  '@adobe/react-spectrum',
  '@spectrum-icons/.*',
  '@react-spectrum/.*',
]);

module.exports = withPlugins([withCSS, withTM], withNx({}));
