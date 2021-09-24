module.exports = function renderTables(tables) {
  const prefix = '\nexport const mockEntityData = [';
  const content = tables.map(
    (table) => `{
      entitryId: \'${table.name}\',
      name: \'${table.name}\',
      entityType: 'FACT',
      properties: ${renderProperties(table.properties)},
    }`,
  );
  const after = '];\n';
  return `${prefix}${content}${after}`;
};

function renderProperties(props) {
  const content = props.map(
    (prop) => `
      {
        propertyId: \'${prop.propertyId}\',
        name: \'${prop.name}\',
        propertyType: \'${prop.propertyType}\',
        isPk: ${prop.isPk},
      }
  `,
  );
  return `[${content}]`;
}
