import { tv, search }                            from "../core";
import { IAlternativeName, IKeyword }            from "../core/interface/info";
import { ISeriesContentRating, IEpisodeGroup, ITheatricalScreening }
                                                 from "../core/interface/tv";
import { TvSeriesDetails, TvSeriesListing, TvSeasonDetails,
	TvSeasonListing }                            from "../components";
import { ISeriesSearchOptions }                  from "../core/interface/options";
import { PaginatedResponse, IPaginatedResponse } from "../util/PaginatedResponse";
import TMDbModule                                from "./TMDbModule";
import { ISeriesTranslation }                    from "../core/interface/language";
import { IVideo }                                from "../core/interface/media";

export class TvModule extends TMDbModule
{
	/**
	 * Get the details of a TV show
	 */
	getSeriesDetails(seriesId: number, language?: string) {
		return new Promise<TvSeriesDetails>((resolve, reject) => {
			tv.getSeriesDetails(this.tmdb.apiKey, seriesId, language)
				.then(details => resolve(new TvSeriesDetails(details, this.tmdb)))
				.catch(reject);
		});
	}

	/**
	 * @TODO
	 */
	getSeriesAccountStates() {}

	/**
	 * Get the alternative titles for a TV show
	 */
	getSeriesAlternativeTitles(seriesId: number, language?: string) {
		return new Promise<IAlternativeName[]>((resolve, reject) => {
			tv.getSeriesAltTitles(this.tmdb.apiKey, seriesId, language)
				.then(titles => resolve(titles.results))
				.catch(reject);
		});
	}

	/**
	 * Get the list of content ratings (certifications) that have been added to a TV show
	 */
	getSeriesContentRatings(seriesId: number, language?: string) {
		return new Promise<ISeriesContentRating[]>((resolve, reject) => {
			tv.getSeriesContentRatings(this.tmdb.apiKey, seriesId, language)
				.then(ratings => resolve(ratings.results))
				.catch(reject);
		});
	}

	/**
	 * @TODO Figure out the return type
	 * Get the credits (cast and crew) of a TV show
	 */
	getSeriesCredits(seriesId: number, language?: string) {
		// return tv.getSeriesCredits(this.tmdb.apiKey, seriesId, language);
	}

	/**
	 * Get all episode groups that have been created for a TV show
	 */
	getSeriesEpisodeGroups(seriesId: number, language?: string) {
		return new Promise<IEpisodeGroup[]>((resolve, reject) => {
			tv.getSeriesEpisodeGroups(this.tmdb.apiKey, seriesId, language)
				.then(result => resolve(result.results))
				.catch(reject);
		});
	}

	/**
	 * Get the list of external IDs for a TV show
	 */
	getSeriesExternalIds(seriesId: number, language?: string) {
		return tv.getSeriesExternalIds(this.tmdb.apiKey, seriesId, language);
	}

	/**
	 * Get a list of images for a TV show
	 */
	getSeriesImages(seriesId: number, language?: string) {
		return tv.getSeriesImages(this.tmdb.apiKey, seriesId, language);
	}

	/**
	 * Get the list of keywords for a TV show
	 */
	getSeriesKeywords(seriesId: number) {
		return new Promise<IKeyword[]>((resolve, reject) => {
			tv.getSeriesKeywords(this.tmdb.apiKey, seriesId)
				.then(result => resolve(result.results))
				.catch(reject);
		});
	}

	/**
	 * Get the list of TV show recommendations for a TV show
	 */
	getSeriesRecommendations(seriesId: number, page?: number, language?: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				tv.getSeriesRecommendations(this.tmdb.apiKey, seriesId, page, language)
					.then(result => resolve({
						body        : TvSeriesListing.fromJson(result.results, this.tmdb),
						page        : result.page,
						totalPages  : result.total_pages,
						totalResults: result.total_results
					})).catch(reject);
			});
		});
	}

	/**
	 * Get a list of similar TV shows
	 */
	getSimilarShows(seriesId: number, page?: number, language?: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				tv.getSimilarShows(this.tmdb.apiKey, seriesId, page, language)
					.then(result => resolve({
						body        : TvSeriesListing.fromJson(result.results, this.tmdb),
						page        : result.page,
						totalPages  : result.total_pages,
						totalResults: result.total_results
					})).catch(reject);
			});
		});
	}

	/**
	 * Get a list of seasons or episodes that have been screened in a film festival or theater
	 */
	getTheatricalScreenings(seriesId: number) {
		return new Promise<ITheatricalScreening[]>((resolve, reject) => {
			tv.getTheatricalScreenings(this.tmdb.apiKey, seriesId)
				.then(result => resolve(result.results))
				.catch(reject);

		});
	}

	/**
	 * Get the list of translations that exist for a TV show
	 */
	getSeriesTranslations(seriesId: number, language?: string) {
		return new Promise<ISeriesTranslation[]>((resolve, reject) => {
			tv.getSeriesTranslations(this.tmdb.apiKey, seriesId, language)
				.then(result => resolve(result.translations))
				.catch(reject);
		});
	}

	/**
	 * Get the videos that have been added to a TV show
	 */
	getSeriesVideos(seriesId: number, language?: string) {
		return new Promise<IVideo[]>((resolve, reject) => {
			tv.getSeriesVideos(this.tmdb.apiKey, seriesId, language)
				.then(result => resolve(result.results))
				.catch(reject);
		});
	}

	/**
	 * @TODO
	 * Rate a TV show
	 */
	rateSeries(seriesId: number, value: number, sessionId?: string, guestSessionId?: string) {}

	/**
	 * @TODO
	 * Delete a rating for a TV show
	 */
	unrateSeries(seriesId: number, sessionId?: string, guestSessionId?: string) {}

	/**
	 * Get the latest TV show
	 */
	getLatestSeries(language?: string) {
		return new Promise<TvSeriesDetails>((resolve, reject) => {
			tv.getLatestSeries(this.tmdb.apiKey, language)
				.then(result => resolve(new TvSeriesDetails(result)))
				.catch();
		});
	}

	/**
	 * @TODO Pagination
	 * Get a list of TV shows airing today. Defaults to EST
	 */
	getShowsAiringToday(page?: number, language?: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				tv.getShowsAiringToday(this.tmdb.apiKey, page, language).then(result => resolve({
					body        : TvSeriesListing.fromJson(result.results, this.tmdb),
					page        : result.page,
					totalPages  : result.total_pages,
					totalResults: result.total_results
				})).catch(reject);
			});
		});
	}

	/**
	 * @TODO Pagination
	 * Get a list of TV shows currently on the air
	 */
	getShowsOnAir(page?: number, language?: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				tv.getShowsOnAir(this.tmdb.apiKey, page, language).then(result => resolve({
					body        : TvSeriesListing.fromJson(result.results, this.tmdb),
					page        : result.page,
					totalPages  : result.total_pages,
					totalResults: result.total_results
				})).catch(reject);
			});
		});
	}

	/**
	 * @TODO Pagination
	 * Get a list of popular TV shows on TMDb
	 */
	getPopularShows(page?: number, language?: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				tv.getPopularShows(this.tmdb.apiKey, page, language).then(result => resolve({
					body        : TvSeriesListing.fromJson(result.results, this.tmdb),
					page        : result.page,
					totalPages  : result.total_pages,
					totalResults: result.total_results
				})).catch(reject);
			});
		});
	}

	/**
	 * @TODO Pagination
	 * Get a list of top rated TV shows on TMDb
	 */
	getTopRatedShows(page?: number, language?: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				tv.getTopRatedShows(this.tmdb.apiKey, page, language).then(result => resolve({
					body        : TvSeriesListing.fromJson(result.results, this.tmdb),
					page        : result.page,
					totalPages  : result.total_pages,
					totalResults: result.total_results
				})).catch(reject);
			});
		});
	}

	/**
	 * Search for a TV show
	 */
	search(query: string, page?: number, options: ISeriesSearchOptions = {}) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<TvSeriesListing>>((resolve, reject) => {
				search.series(this.tmdb.apiKey, query, p, options).then(result => resolve({
					body        : TvSeriesListing.fromJson(result.results, this.tmdb),
					page        : result.page,
					totalPages  : result.total_pages,
					totalResults: result.total_results
				})).catch(reject);
			});
		});
	}

	// TV Seasons ----------------------------------------------------------------------------------

	/**
	 * Get the details of a TV show's season
	 */
	getSeasonDetails(seriesId: number, season: number, language?: string) {
		return new Promise<TvSeasonDetails>((resolve, reject) => {
			tv.getSeasonDetails(this.tmdb.apiKey, seriesId, season, language)
				.then(result => resolve(new TvSeasonDetails(seriesId, result)))
				.catch(reject);
		});
	}

	/**
	 * @TODO
	 * Get the user ratings for a season's episodes
	 */
	getSeasonAccountStates(seriesId: number, season: number, sessionId?: string,
		guestSessionId?: string, language?: string)
	{}

	/**
	 * Get the credits for a TV show's season
	 */
	getSeasonCredits(seriesId: number, season: number, language?: string) {
		// return tv.getSeasonCredits(this.tmdb.apiKey, seriesId, season, language);
	}

	/**
	 * Get the list of external IDs for a TV show's season
	 */
	getSeasonExternalIds(seriesId: number, season: number, language?: string) {
		return tv.getSeasonExternalIds(this.tmdb.apiKey, seriesId, season, language);
	}

	/**
	 * Get a list of images for a TV show's season
	 */
	getSeasonImages(seriesId: number, season: number, language?: string) {
		return tv.getSeasonImages(this.tmdb.apiKey, seriesId, season, language);
	}

	/**
	 * Get a list of videos for a TV show's season
	 */
	getSeasonVideos(seriesId: number, season: number, language?: string) {
		return new Promise<IVideo[]>((resolve, reject) => {
			tv.getSeasonVideos(this.tmdb.apiKey, seriesId, season, language)
				.then(result => resolve(result.results))
				.catch(reject);
		});
	}

	// TV Episodes ---------------------------------------------------------------------------------

	/**
	 * Get an episode's details
	 */
	getEpisodeDetails(seriesId: number, season: number, episode: number, language?: string) {
		// return tv.getEpisodeDetails();
	}

	/**
	 * @TODO Account Information
	 * Get the account's rating for a TV show episode
	 */
	getEpisodeAccountState(seriesId: number, season: number, episode: number,
		sessionId?: string, guestSessionId?: string, language?: string)
	{
	}

	/**
	 * Get the credits for a TV show episode
	 */
	getEpisodeCredits(apiKey: string, seriesId: number, season: number, episode: number) {
	}

	/**
	 * Get the list of external IDs for a TV show episode
	 */
	getEpisodeExternalIds(apiKey: string, seriesId: number, season: number, episode: number) {
	}

	/**
	 * Get a list of images for a TV show episode
	 */
	getEpisodeImages(apiKey: string, seriesId: number, season: number, episode: number) {
	}

	/**
	 * Get the translation data for a TV show episode
	 */
	getEpisodeTranslations(apiKey: string, seriesId: number, season: number, episode: number) {
	}

	/**
	 * Rate a TV show episode
	 */
	rateEpisode(apiKey: string, seriesId: number, season: number, episode: number, value: number,
		sessionId?: string, guestSessionId?: string)
	{
	}

	/**
	 * Delete a rating for a TV show episode
	 */
	unrateEpisode(apiKey: string, seriesId: number, season: number, episode: number,
		sessionId?: string, guestSessionId?: string)
	{
	}

	/**
	 * Get a list of videos for a TV show episode
	 */
	getEpisodeVideos(apiKey: string, seriesId: number, season: number, episode: number,
		language?: string)
	{

	}

	// TV Episode Groups ---------------------------------------------------------------------------

	/**
	 * Get the details of a TV episode group
	 */
	getEpisodeGroupDetails(apiKey: string, groupId: string, language?: string) {

	}

}
