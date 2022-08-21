<template>
  <v-row
    v-if="
      this.getSearchMovies.data &&
      getSearchMovies?.data[$route.params.q]?.results?.length > 0
    "
  >
    <v-col
      md="3"
      sm="3"
      v-for="item in getSearchMovies?.data[$route.params.q]?.results"
      :key="item.id"
      :title="item.title"
      class="col-12"
    >
      <MovieCard
        :movieName="item.title"
        :movieImage="
          item.poster_path &&
          `https://image.tmdb.org/t/p/w500${item.poster_path}`
        "
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
      v-if="getSearchMovies.status === 'PENDING'"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-col>
  </v-row>
  <h2 class="mt-5" v-else>Movie Not Found</h2>
</template>

<script>
import MovieCard from "@/components/MovieCard";

export default {
  name: "SearchMovies",
  components: {
    MovieCard,
  },
  data() {
    return {
      perPage: 1,
    };
  },
  created() {
    this.perPage =
      this.getSearchMovies.data &&
      this.getSearchMovies?.data[this.$route.params.q]?.page
        ? this.getSearchMovies.data[this.$route.params.q]?.page
        : 1;
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("searchMovies", {
      perPage: this.perPage,
      lang: this.$i18n.locale,
      q: this.$route.params.q,
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
        this.getSearchMovies.status !== "PENDING"
      ) {
        this.perPage++;
        this.$store.dispatch("searchMovies", {
          perPage: this.perPage,
          lang: this.$i18n.locale,
          q: this.$route.params.q,
        });
      }
    },
  },
  computed: {
    getSearchMovies() {
      return this.$store.getters.getSearchMovies;
    },
  },
  watch: {
    "$route.params.q": function () {
      this.$store.dispatch("searchMovies", {
        perPage: this.perPage,
        lang: this.$i18n.locale,
        q: this.$route.params.q,
      });
    },
  },
};
</script>
