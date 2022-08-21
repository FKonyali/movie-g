<template>
  <div class="d-flex search-content">
    <v-text-field
      flat
      hide-details
      append-icon="mdi-magnify"
      :placeholder="$t('header.searchInputPlaceholder')"
      outlined
      dense
      v-model="q"
      @click:append="handleSearch"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    q: null,
  }),
  methods: {
    handleSearch() {
      if (!this.q.trim()) return;
      this.$router.push(`/search/${this.q}`).catch(() => {});
    },
    selectLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>
