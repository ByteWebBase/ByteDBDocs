#!/usr/bin/env node

const getTableProperties = require('../lib/getTableProperties.js');
const getSchemaRefs = require('../lib/getSchemaRefs.js');

const fs = require('fs');
const { ModelExporter, Parser } = require('@dbml/core');

const dbml = fs.readFileSync('poker.dbml', 'utf-8');
const database = Parser.parse(dbml, 'dbml');

const schema = database.schemas[0]; // 本包暂时只能实现一个schema的图
const tables = schema.tables; // 获得schema里所有的table

// 获得供src使用的table对象数组
const renderTables = tables.map((table) => ({
  entitryId: table.name,
  name: table.name,
  entityType: 'FACT',
  properties: getTableProperties(table),
}));

// 获得table的refs
const schemaRefs = getSchemaRefs(schema);

// const tableProperties = getTableProperties(tables[0][0]);
// console.log('tableProperties: ', tableProperties);
// console.log(database.schemas[0].tables[0]);
console.log(database);
