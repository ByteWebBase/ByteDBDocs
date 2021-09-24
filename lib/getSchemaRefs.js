module.exports = function getSchemaRefs(schema) {
  const { refs } = schema;
  return refs.map((ref) => ({
    relationId: `${schema.name}${ref.id}`,
    sourceEntityId: ref.endpoints[0].tableName,
    targetEntityId: ref.endpoints[1].tableName,
  }));
};
