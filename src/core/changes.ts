import { IChangesOptions } from "./interface/options";
import { IChangedMovies,
         IChangedTvShows,
         IChangedPeople,
         IMovieChanges,
         ISeriesChanges,
         ISeasonChanges,
         IEpisodeChanges,
         IPersonChanges }  from "./interface/changes";
import { get }             from "./util/network";

export const changes = {
	/**
	 * Get a list of the most recently changed movies
	 */
	getChangedMovies(apiKey: string, page?: number, options: IChangesOptions = {}) {
		return get<IChangedMovies>(apiKey, `movie/changes`, Object.assign(options, { page }));
	},

	/**
	 * Get a list of the most recently changed people
	 */
	getChangedPeople(apiKey: string, page?: number, options: IChangesOptions = {}) {
		return get<IChangedPeople>(apiKey, `person/changes`, Object.assign(options, { page }));
	},

	/**
	 * Get a list of the most recently changed tv shows
	 */
	getChangedTvShows(apiKey: string, page?: number, options: IChangesOptions = {}) {
		return get<IChangedTvShows>(apiKey, `tv/changes`, Object.assign(options, { page }));
	},

	/**
	 * Get the changes for a movie. By default only the last 24 hours are returned
	 */
	getMovieChanges(apiKey: string, movieId: number, page?: number, options: IChangesOptions = {}) {
		return get<IMovieChanges>(apiKey, `movie/${movieId}/changes`, Object.assign(options, { page }));
	},

	/**
	 * Get the recent changes for a person. By default only the last 24 hours are returned
	 */
	getPersonChanges(apiKey: string, personId: number, page?: number,
		options: IChangesOptions = {})
	{
		return get<IPersonChanges>(apiKey, `person/${personId}/changes`,
			Object.assign(options, { page }));
	},

	/**
	 * Get the recent changes for a TV show's season. By default only the last 24 hours are returned
	 */
	getSeasonChanges(apiKey: string, seasonId: number, page?: number,
		options: IChangesOptions = {})
	{
		return get<ISeasonChanges>(apiKey, `tv/season/${seasonId}/changes`,
			Object.assign(options, { page }));
	},

	/**
	 * Get the recent changes of a TV show's episode. By default only the last 24 hours are returned
	 */
	getEpisodeChanges(apiKey: string, episodeId: number, page?: number,
		options: IChangesOptions = {})
	{
		return get<IEpisodeChanges>(apiKey, `tv/episode/${episodeId}/changes`,
			Object.assign(options, { page }));
	},

	/**
	 * Get the changes for a TV show. By default only the last 24 hours are returned
	 */
	getSeriesChanges(apiKey: string, seriesId: number, page?: number,
		options: IChangesOptions = {})
	{
		return get<ISeriesChanges>(apiKey, `tv/${seriesId}/changes`, Object.assign(options, { page }));
	},
};
