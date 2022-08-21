<template>
  <v-row>
    <v-col
      md="6"
      sm="6"
      v-for="item in getTopRatedMovies?.data?.results"
      :key="item.id"
      :title="item.title"
    >
      <MovieCard
        :movieName="item.title"
        :movieImage="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        :moviePublishedDate="item.release_date"
        :movieSlug="`/movie/${item.id}`"
        :movieRate="item.vote_average"
        :movieReleaseDate="item.release_date"
      />
    </v-col>
    <v-col
      md="12"
      sm="12"
      class="text-center"
      v-if="getTopRatedMovies.status === 'PENDING'"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import MovieCard from "@/components/MovieCard";

export default {
  name: "HomeTopRatedMovies",
  components: {
    MovieCard,
  },
  data() {
    return {
      perPage: 1,
    };
  },
  created() {
    this.perPage = this?.getTopRatedMovies?.data?.page
      ? this.getTopRatedMovies.data.page
      : 1;
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("topRatedMovies", {
      perPage: this.perPage,
      lang: "en-US",
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (
        window.innerHeight + window.scrollY + 100 >=
          document.body.offsetHeight &&
        this.getTopRatedMovies.status !== "PENDING"
      ) {
        this.perPage++;
        this.$store.dispatch("topRatedMovies", {
          perPage: this.perPage,
          lang: "en-US",
        });
      }
    },
  },
  computed: {
    getTopRatedMovies() {
      return this.$store.getters.getTopRatedMovies;
    },
  },
};
</script>
