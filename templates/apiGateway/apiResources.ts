import { ApiResource } from "./ApiResource";

export const apiResources = [
  new ApiResource({
    name: "NetlifyCmsAuthUri",
    method: "GET",
    path: "/auth",
    responseStatusCode: 302,
    s3Prefix: "resources/netlify-cms-auth",
    bundleFile: require.resolve("nomad-netlify-cms-auth/dist/authUri")
  }),
  new ApiResource({
    name: "NetlifyCmsAuthCallback",
    method: "GET",
    path: "/callback",
    responseStatusCode: 200,
    s3Prefix: "resources/netlify-cms-auth",
    bundleFile: require.resolve("nomad-netlify-cms-auth/dist/authCallback")
  }),
  new ApiResource({
    name: "NetlifyCmsAuthSuccess",
    method: "GET",
    path: "/success",
    responseStatusCode: 200,
    s3Prefix: "resources/netlify-cms-auth",
    bundleFile: require.resolve("nomad-netlify-cms-auth/dist/authSuccess"),
  })
];
