module.exports = function renderTables(tables) {
  const prefix = '\nexport const mockEntityData: EntityCanvasModel[] = [';
  const content = tables.map(
    (table) => `{
      entityId: \'${table.name}\',
      name: \'${table.name}\',
      entityType: 'FACT',
      width: ${table.width},
      height: ${table.height},
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
        isPK: ${prop.isPk},
      }
  `,
  );
  return `[${content}]`;
}
