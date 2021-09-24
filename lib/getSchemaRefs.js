module.exports = function getSchemaRefs(schema) {
  const { refs } = schema;
  return refs.map((ref) => ({
    relationId: `${schema.name}${ref.id}`,
    sourceEntityId: ref.endpoints[0].tableName,
    targetEntityId: ref.endpoints[1].tableName,
    label: `${getLabel(ref.endpoints[0].relation)} : ${getLabel(
      ref.endpoints[1].relation,
    )}`,
  }));
};

function getLabel(ref) {
  return ref === '*' ? 'N' : ref;
}
