import { EnhanceApp } from "vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue, isServer }) => {
  if (!isServer) {
    import("vue-toasted" /* webpackChunkName: "notification" */).then(module => {
      Vue.use(module.default);
    });
  }
};

export default enhanceApp;
