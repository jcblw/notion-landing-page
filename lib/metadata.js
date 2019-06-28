export const getMetadata = (tables = {}) => {
  if (!tables.Metadata) {
    return {};
  }
  const metadata = {};
  tables.Metadata.table.forEach(row => {
    metadata[row[0]] = row[1][0];
  });
  return metadata;
};
