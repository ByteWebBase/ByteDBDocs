#!/usr/bin/env node

const program = require('commander');
const pretreatment = require('./pretreatment');
// import { program } from 'commander';
// import * as index from './pretreatment.js'
// 策略模式
program.version('0.0.1');
program.command('build <name>').description('build data').action(pretreatment);
program.parse(process.argv);
