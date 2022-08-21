<template>
  <v-col md="4" class="sticky-top">
    <v-select
      v-model="orderSelect"
      :items="orderItems"
      label="Sort Movies by"
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
        name: "Popular",
      },
      orderItems: [
        {
          id: 0,
          name: "Popular",
        },
        {
          id: 1,
          name: "Rating Descending",
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

<style lang="scss" scoped>
.sticky-top {
  position: sticky;
  top: 0;
  height: 100vh;
  padding-top: 84px;
  margin-top: -64px;
}
</style>
