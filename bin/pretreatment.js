// 打印欢迎界面
const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const readFile = promisify(require('fs').readFile);
const clear = require('clear');
const chalk = require('chalk');
const getTableProperties = require('../lib/getTableProperties.js');
const getSchemaRefs = require('../lib/getSchemaRefs.js');
const renderTables = require('../lib/renderTables.js');
const renderSchemaRefs = require('../lib/renderSchemaRefs.js');
const fs = require('fs');
const path = require('path');
const { ModelExporter, Parser } = require('@dbml/core');
const prettier = require('prettier');

const log = (content) => {
  console.log(chalk.green(content));
};

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const welcome = await figlet('Welcome to ByteDBDocs');
  log(welcome);
  // 数据模板
  const extname = path.extname(path.resolve(name));
  if (extname == '.dbml') {
    parseDbml(name);
  } else if (extname == '.json') {
    parseJson();
  } else {
    throw new Error('Unexpected file type');
  }
};

function parseDbml(name) {
  const dbml = fs.readFileSync(path.resolve(name), 'utf-8');
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
}
function parseJson() {
  console.log('处理json');
}
