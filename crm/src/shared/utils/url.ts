export function toURLSearchParams(filters: object) {
  let query = {};
  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key)) {
      const value = filters[key];
      if (value) query[key] = value;
    }
  }
  return new URLSearchParams(query).toString();
}