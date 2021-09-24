module.exports = function getTableProperties(table) {
  const { name, fields } = table;
  return fields.map((field) => ({
    propertyId: `${name}TableProperties${field.id}`,
    name: field.name,
    propertyType: field.type.type_name,
    isPk: Boolean(field.pk),
  }));
};
