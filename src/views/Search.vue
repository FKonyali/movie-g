<template>
  <div class="saerch-page">
    <h1>Search Results</h1>
    <SearchMovies />
  </div>
</template>

<script>
import SearchMovies from "@/components/SearchMovies";

export default {
  name: "Search",
  components: {
    SearchMovies,
  },
};
</script>
