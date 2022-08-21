<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-container class="d-flex align-center">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            @click="drawer = true"
            class="v-app-bar__nav-icon hidden-md-and-up v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default"
          >
          </v-app-bar-nav-icon>
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
                <div class="d-flex search-content">
                  <v-text-field
                    flat
                    hide-details
                    append-icon="mdi-magnify"
                    placeholder="Search"
                    outlined
                    dense
                    v-model="q"
                    @click:append="handleSearch"
                  ></v-text-field>
                </div>
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
                <v-list-item link>
                  <v-list-item-title>Türkçe</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>English</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false,
    group: null,
    q: null,
  }),
  methods: {
    handleSearch() {
      this.$router.push(`/search/${this.q}`).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.search-content {
  padding: 20px;
}
</style>
