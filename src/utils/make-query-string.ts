type QueryObject = { [key: string]: string | number | boolean };

export function makeQueryString(queryObj: QueryObject): string {
  const path = [];
  for (const [key, value] of Object.entries(queryObj)) {
    path.push(`${key}=${value}`);
  }
  return path.join("&");
}
