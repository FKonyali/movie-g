export default {
  updatePopularMovies(state, data) {
    state.popularMovies = data;
  },
  updateMovieDetails(state, data) {
    state.movieDetails = data;
  },
  updateMovieCredits(state, data) {
    state.movieCredits = data;
  },
};
