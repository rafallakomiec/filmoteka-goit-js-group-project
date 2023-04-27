import { fetchMovieById } from './fetch-items';
import { Notify } from 'notiflix';

export const getLibraryMovies = async libraryList => {
  const movies = [];

  if (libraryList !== undefined) {
    for (const movie of libraryList) {
      const responseMovie = await fetchMovieById(movie);

      if (responseMovie instanceof Error) {
        Notify.failure(responseMovie.message, configNotiflix);
        return;
      }

      if (
        responseMovie.genres !== undefined ||
        Array.isArray(responseMovie.genres) ||
        responseMovie.genre_ids == undefined ||
        !Array.isArray(responseMovie.genre_ids)
      ) {
        responseMovie.genre_names = responseMovie.genres.map(genre => genre.name);
      } else {
        responseMovie.genre_names = changeGenresIdToName(
          responseMovie.genre_ids,
          genresDecodeArray
        );
      }

      movies.push(responseMovie);
    }

    return movies;
  }
};
