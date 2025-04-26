export const buildOrganizationOptions = organizations =>
  organizations.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
