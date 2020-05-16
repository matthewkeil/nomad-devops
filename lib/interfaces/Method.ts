enum ALLOWED_METHODS {
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
}
const methods = new Set<keyof typeof ALLOWED_METHODS>();
for (const method of Object.keys(ALLOWED_METHODS))
  if (isNaN(+method)) methods.add(method as keyof typeof ALLOWED_METHODS);
export { methods };
export type Method = keyof typeof ALLOWED_METHODS;
