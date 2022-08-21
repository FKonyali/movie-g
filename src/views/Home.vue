<template>
  <div class="home">
    <v-row>
      <Sidebar />
      <v-col md="8" class="col-12">
        <HomePopularMovies v-if="getOrderSelect.id === 0" />
        <HomeTopRatedMovies v-if="getOrderSelect.id === 1" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import HomePopularMovies from "@/components/HomePopularMovies";
import HomeTopRatedMovies from "@/components/HomeTopRatedMovies";

export default {
  name: "Home",
  components: {
    Sidebar,
    HomePopularMovies,
    HomeTopRatedMovies,
  },
  computed: {
    getOrderSelect() {
      return this.$store.getters.getOrderSelect;
    },
  },
};
</script>
