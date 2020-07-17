#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fayeModule = require('./');

const cli = meow(`
Usage
  $ faye-module [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ faye-module
  unicorns
  $ faye-module rainbows
  unicorns & rainbows
`);
