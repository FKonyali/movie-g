<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-container class="d-flex align-center">
        <div class="d-flex align-center">
          <v-toolbar-title>
            <router-link to="/" class="white--text text-decoration-none">
              Movie-g
            </router-link>
          </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
        <v-list color="primary" dense nav class="d-flex pa-0">
          <v-list-item>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
              <v-list>
                <Search />
              </v-list>
            </v-menu>
          </v-list-item>
          <v-list-item>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon dark v-bind="attrs" v-on="on">
                  <v-icon> mdi-translate </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link @click="selectLang('tr')">
                  <v-list-item-title>Türkçe</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="selectLang('en')">
                  <v-list-item-title>English</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import Search from "@/components/Search";

export default {
  name: "Header",
  data: () => ({
    drawer: false,
    group: null,
  }),
  components: {
    Search,
  },
  methods: {
    selectLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-content {
  padding: 20px;
}
</style>
