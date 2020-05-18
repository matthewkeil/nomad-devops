declare enum ALLOWED_METHODS {
    "GET" = 0,
    "POST" = 1,
    "PUT" = 2,
    "PATCH" = 3,
    "DELETE" = 4
}
declare const methods: Set<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">;
export { methods };
export declare type Method = keyof typeof ALLOWED_METHODS;
