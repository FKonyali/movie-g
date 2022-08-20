<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

img {
  max-width: 100%;
  vertical-align: top;
}

a {
  text-decoration: none;
}
</style>
