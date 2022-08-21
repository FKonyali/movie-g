import axios from "axios";

let API_URL = "";

if (window._env_ && window._env_.VUE_APP_API_URL) {
  API_URL = window._env_.VUE_APP_API_URL;
} else {
  API_URL = process.env.VUE_APP_API_URL;
}

let API_KEY = "";

if (window._env_ && window._env_.VUE_APP_API_KEY) {
  API_KEY = window._env_.VUE_APP_API_KEY;
} else {
  API_KEY = process.env.VUE_APP_API_KEY;
}

axios.defaults.baseURL = API_URL;

export default {
  async popularMovies(context, { perPage, lang }) {
    if (perPage === context?.getters?.getPopularMovies?.data?.page) return;
    if (perPage >= context?.getters?.getSearchMovies?.data?.total_pages) return;
    context.commit("updatePopularMovies", {
      ...context.getters.getPopularMovies,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `movie/popular?api_key=${API_KEY}&language=${lang}&page=${perPage}`
      );
      const prevResultData = context?.getters?.getPopularMovies?.data?.results
        ? context?.getters?.getPopularMovies?.data?.results
        : [];
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
  async topRatedMovies(context, { perPage, lang }) {
    if (perPage === context?.getters?.getTopRatedMovies?.data?.page) return;
    if (perPage >= context?.getters?.getSearchMovies?.data?.total_pages) return;
    context.commit("updateTopRatedMovies", {
      ...context.getters.getTopRatedMovies,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `movie/top_rated?api_key=${API_KEY}&language=${lang}&page=${perPage}`
      );
      const prevResultData = context?.getters?.getTopRatedMovies?.data?.results
        ? context?.getters?.getTopRatedMovies?.data?.results
        : [];
      context.commit("updateTopRatedMovies", {
        ...context.getters.getTopRatedMovies,
        status: "SUCCESS",
        data: {
          ...data,
          results: [...prevResultData, ...data.results],
        },
      });
    } catch (error) {
      console.log(error);
      context.commit("updateTopRatedMovies", {
        ...context.getters.getMovieDetails,
        status: "FAILED",
        data: error,
      });
    }
  },
  async movieDetails(context, { movieID, lang }) {
    if (movieID === context?.getters?.getPopularMovies?.data?.results?.movieID)
      return;
    context.commit("updateMovieDetails", {
      ...context.getters.getMovieDetails,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `movie/${movieID}?api_key=${API_KEY}&language=${lang}`
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
  async movieCredits(context, { movieID, lang }) {
    context.commit("updateMovieCredits", {
      ...context.getters.getMovieCredits,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `movie/${movieID}/credits?api_key=${API_KEY}&language=${lang}`
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
  async searchMovies(context, { perPage, lang, q }) {
    const prevData = context?.getters?.getSearchMovies?.data;
    if (prevData && perPage === prevData[q]?.page) return;
    if (prevData && perPage >= prevData[q]?.total_pages) return;
    context.commit("updateSearchMovies", {
      ...context.getters.getSearchMovies,
      status: "PENDING",
    });
    try {
      const { data } = await axios.get(
        `search/movie?api_key=${API_KEY}&language=${lang}&query=${q}&page=${perPage}&include_adult=false`
      );
      const prevResultData =
        prevData && prevData[q]?.results ? prevData[q]?.results : [];
      context.commit("updateSearchMovies", {
        ...context.getters.getSearchMovies,
        status: "SUCCESS",
        data: {
          ...prevData,
          [q]: {
            ...data,
            results: [...prevResultData, ...data.results],
          },
        },
      });
    } catch (error) {
      console.log(error);
      context.commit("updateSearchMovies", {
        ...context.getters.getMovieDetails,
        status: "FAILED",
        data: error,
      });
    }
  },
};
