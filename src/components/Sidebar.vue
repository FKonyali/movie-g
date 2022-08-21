<template>
  <v-col md="4" class="sticky-top col-12">
    <v-select
      v-model="orderSelect"
      :items="orderItems"
      :label="$t('filter.selectPlaceholder')"
      outlined
      item-text="name"
      item-value="id"
      return-object
    ></v-select>
  </v-col>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      perPage: 1,
      orderSelect: {
        id: 0,
        name: this.$t("filter.popular"),
      },
      orderItems: [
        {
          id: 0,
          name: this.$t("filter.popular"),
        },
        {
          id: 1,
          name: this.$t("filter.ratingDescending"),
        },
      ],
    };
  },
  created() {
    this.orderSelect = this.getOrderSelect.id
      ? this.getOrderSelect
      : this.orderSelect;
    this.$store.commit("updateOrderSelect", this.orderSelect);
  },
  computed: {
    getOrderSelect() {
      return this.$store.getters.getOrderSelect;
    },
  },
  watch: {
    orderSelect: function () {
      window.scroll(0, 0);
      this.$store.commit("updateOrderSelect", this.orderSelect);
    },
  },
};
</script>

<style lang="scss">
.sticky-top {
  position: sticky;
  top: 0;
  height: 100%;
  padding-top: 84px;
  margin-top: -64px;
  background: #FFF;
  z-index: 1;
  .v-text-field__details {
    display: none;
  }
}
</style>
