#!/usr/bin/env node

const getTableProperties = require('../lib/getTableProperties.js');
const getSchemaRefs = require('../lib/getSchemaRefs.js');
const renderTables = require('../lib/renderTables.js');
const renderSchemaRefs = require('../lib/renderSchemaRefs.js');
const fs = require('fs');
const path = require('path');
const { ModelExporter, Parser } = require('@dbml/core');
const prettier = require('prettier');

const dbml = fs.readFileSync('poker.dbml', 'utf-8');
const database = Parser.parse(dbml, 'dbml');

const schema = database.schemas[0]; // 本包暂时只能实现一个schema的图
const tables = schema.tables; // 获得schema里所有的table

// 获得供src使用的table对象数组
const tablesForRender = tables.map((table) => ({
  entitryId: table.name,
  name: table.name,
  entityType: 'FACT',
  properties: getTableProperties(table),
  width: 170,
  height: 200,
}));

// 获得schema的refs
const schemaRefs = getSchemaRefs(schema);

const prefix = `import {
  EntityProperty,
  EntityCanvasModel,
  RelationCanvasModel,
} from './interface';`;

fs.writeFileSync(
  path.resolve(__dirname, '../src/pages/ERGraphDemo/mock.ts'),
  prettier.format(
    prefix + renderTables(tablesForRender) + renderSchemaRefs(schemaRefs),
    {
      parser: 'babel',
    },
  ),
);

// console.log('renderTable: ', renderTable(renderTables));
// console.log('schemaRefs: ', renderSchemaRefs(schemaRefs));

// console.log(renderTables[0]);
// fs.writeFileSync(getPath(), );

// const tableProperties = getTableProperties(tables[0][0]);
// console.log('tableProperties: ', tableProperties);
// console.log(database.schemas[0].tables[0]);
// console.log(database);

function getPath() {
  return '../data/graph.ts';
}
