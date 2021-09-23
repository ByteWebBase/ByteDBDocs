#!/usr/bin/env node

const fs = require('fs');
const { ModelExporter, Parser } = require('@dbml/core');

const dbml = fs.readFileSync('poker.dbml', 'utf-8');
const database = Parser.parse(dbml, 'dbml');

console.log(database);
