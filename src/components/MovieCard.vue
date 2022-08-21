<template>
  <v-card class="mx-auto my-1" link :to="movieSlug">
    <v-img :src="movieImage" :aspect-ratio="6 / 9"></v-img>
    <v-card-title class="card-title"> {{ movieName }} </v-card-title>
    <v-card-text class="pb-0">
      <v-row align="center" class="mx-0">
        <v-icon color="#f5c518">mdi-star</v-icon>
        <div class="grey--text ms-2 subtitle-1">{{ movieRate }}/10</div>
      </v-row>
      <div class="my-4 text-subtitle-1">
        Release date: {{ new Date(movieReleaseDate).getFullYear() }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary lighten-2" text> Detail </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movieName: {
      type: String,
      default: null,
    },
    movieImage: {
      type: String,
      default: null,
    },
    movieReleaseDate: {
      type: String,
      default: null,
    },
    movieSlug: {
      type: String,
      default: null,
    },
    movieRate: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
</style>
