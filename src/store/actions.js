import axios from "axios";

let API_URL = "";

if (window._env_ && window._env_.REACT_APP_API_URL) {
  API_URL = window._env_.REACT_APP_API_URL;
} else {
  API_URL = process.env.REACT_APP_API_URL;
}

axios.defaults.baseURL = API_URL;

export default {
  async popularMovies(context, { perPage, lang }) {
    context.commit("updatePopularMovies", {
      ...context.getters.getPopularMovies,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6c275970bcd27b8212f49859e29153d6&language=${lang}&page=${perPage}`
      );
      const prevResultData = context?.getters?.getPopularMovies?.data?.results
        ? context?.getters?.getPopularMovies?.data?.results
        : [];
      if (perPage === context?.getters?.getPopularMovies?.data?.page) return;
      context.commit("updatePopularMovies", {
        ...context.getters.getPopularMovies,
        status: "SUCCESS",
        data: {
          ...data,
          results: [...prevResultData, ...data.results],
        },
      });
    } catch (error) {
      console.log(error);
      context.commit("updatePopularMovies", {
        ...context.getters.getMovieDetails,
        status: "FAILED",
        data: error,
      });
    }
  },
  async movieDetails(context, { movieID }) {
    context.commit("updateMovieDetails", {
      ...context.getters.getMovieDetails,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=6c275970bcd27b8212f49859e29153d6&language=en-US`
      );
      const prevResultData = context?.getters?.getMovieDetails?.data?.results
        ? context?.getters?.getMovieDetails?.data?.results
        : [];
      context.commit("updateMovieDetails", {
        ...context.getters.getMovieDetails,
        status: "SUCCESS",
        data: {
          results: {
            ...prevResultData,
            [movieID]: data,
          },
        },
      });
    } catch (error) {
      console.log(error);
      context.commit("updateMovieDetails", {
        ...context.getters.getMovieDetails,
        status: "FAILED",
        data: error,
      });
    }
  },
  async movieCredits(context, { movieID }) {
    context.commit("updateMovieCredits", {
      ...context.getters.getMovieCredits,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=6c275970bcd27b8212f49859e29153d6&language=en-US`
      );
      const prevResultData = context?.getters?.getMovieDetails?.data?.results
        ? context?.getters?.getMovieCredits?.data?.results
        : [];
      context.commit("updateMovieCredits", {
        ...context.getters.getMovieCredits,
        status: "SUCCESS",
        data: {
          results: {
            ...prevResultData,
            [movieID]: data,
          },
        },
      });
    } catch (error) {
      console.log(error);
      context.commit("updateMovieCredits", {
        ...context.getters.getMovieCredits,
        status: "FAILED",
        data: error,
      });
    }
  },
};
