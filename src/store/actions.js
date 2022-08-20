let apiRootURL = "";

if (window._env_ && window._env_.VUE_APP_API_ROOT_URL) {
  apiRootURL = window._env_.VUE_APP_API_ROOT_URL;
} else {
  apiRootURL = process.env.VUE_APP_API_ROOT_URL;
}

console.log("apiRootURL", apiRootURL);

export default {};
