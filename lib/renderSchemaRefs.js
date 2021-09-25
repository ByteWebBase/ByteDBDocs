module.exports = function renderSchemaRefs(schemaRefs) {
  const prefix = '\nexport const mockRelationData: RelationCanvasModel[] = [';
  const content = schemaRefs.map(
    (schemaRef) => `{
    relationId: \'${schemaRef.relationId}\',
    sourceEntityId: \'${schemaRef.sourceEntityId}\',
    targetEntityId: \'${schemaRef.targetEntityId}\',
    label: \'${schemaRef.label}\',
  }`,
  );
  const after = '];\n';
  return `${prefix}${content}${after}`;
};
