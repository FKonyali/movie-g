<template>
  <div class="detail">
    <div class="text-right">
      <v-btn
        color="primary"
        text
        :ripple="false"
        plain
        class="mt-5 mb-8"
        @click="goBack"
      >
        <v-btn class="ma-2" outlined large fab color="indigo">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Go Back
      </v-btn>
    </div>
    <v-row>
      <v-col md="4" sm="4">
        <v-img
          v-if="getMovieDetails?.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${getMovieDetails?.poster_path}`"
        ></v-img>
        <v-skeleton-loader
          v-else
          max-width="100%"
          type="image"
        ></v-skeleton-loader>
      </v-col>
      <v-col md="8" sm="8">
        <div v-if="getMovieDetails">
          <h1 class="text-h4 mb-1 font-weight-bold">
            {{ getMovieDetails?.title }}
          </h1>
          <h3 class="mb-2">
            {{ new Date(getMovieDetails?.release_date).getFullYear() }}
          </h3>
          <h3 class="d-flex align-center">
            <v-icon color="#f5c518">mdi-star</v-icon>
            <div class="grey--text ms-2 subtitle-1">
              {{
                (Math.round(getMovieDetails?.vote_average * 100) / 100).toFixed(
                  1
                )
              }}/10
            </div>
          </h3>
          <v-row>
            <v-col cols="auto">
              <h2>Genres:</h2>
            </v-col>
            <v-col>
              <v-chip
                v-for="item in getMovieDetails?.genres"
                :key="item.id"
                class="mr-2 mb-2"
              >
                {{ item.name }}
              </v-chip>
            </v-col>
          </v-row>
          <p class="mt-5">
            {{ getMovieDetails?.overview }}
          </p>
          <h2 class="mb-5 mt-5">Top cast:</h2>
          <v-row>
            <v-col
              md="6"
              sm="6"
              v-for="item in getMovieCredits?.cast"
              :key="item.id"
              class="d-flex align-center col-12"
            >
              <v-avatar size="96" color="primary" class="mr-5">
                <v-img
                  v-if="item?.profile_path"
                  :src="`https://image.tmdb.org/t/p/w200${item?.profile_path}`"
                ></v-img>
                <div v-else class="headline cast-no-avatar">
                  {{ item?.name.split(" ")[0]?.charAt(0) }}
                </div>
              </v-avatar>
              <div>
                <h4>
                  {{ item?.name }}
                </h4>
                <h5>
                  {{ item?.character }}
                </h5>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-skeleton-loader
          v-else
          max-width="100%"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Detail",
  created() {
    this.$store.dispatch("movieDetails", {
      movieID: this.$route.params.id,
    });

    this.$store.dispatch("movieCredits", {
      movieID: this.$route.params.id,
    });
  },
  computed: {
    getMovieDetails() {
      return this.$store.getters.getMovieDetails?.data?.results[
        this.$route.params.id
      ];
    },
    getMovieCredits() {
      return this.$store.getters.getMovieCredits?.data?.results[
        this.$route.params.id
      ];
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.cast-no-avatar {
  color: #fff;
}
</style>
