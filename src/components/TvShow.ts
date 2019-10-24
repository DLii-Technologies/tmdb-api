import { IProductionCompany, INetwork }     from "../core/interface/company";
import { ISeries, ISeriesDetails, ISeason } from "../core/interface/tv";
import { IMember }                          from "../core/interface/credits";
import { IGenre }                           from "../core/interface/info";
import { Component }                        from "./Component";
import { TMDb }                             from "../TMDb";
import { TvEpisodeListing }                 from "./TvEpisode";
import utils                                from "../util";
import { TvSeasonListing } from "./TvSeason";

class TvShow extends Component
{
	public readonly backdropPath    : string | null;
	public readonly firstAirDate    : Date;
	public readonly id              : number;
	public readonly name            : string;
	public readonly originCountry   : string[];
	public readonly originalLanguage: string;
	public readonly originalName    : string;
	public readonly overview        : string;
	public readonly popularity      : number;
	public readonly posterPath      : string | null;
	public readonly voteAverage     : number;
	public readonly voteCount       : number;

	constructor(series: ISeries|ISeriesDetails, tmdb?: TMDb) {
		super(tmdb);
		this.backdropPath     = series.backdrop_path;
		this.firstAirDate     = new Date(series.first_air_date);
		this.id               = series.id;
		this.name             = series.name;
		this.originCountry    = series.origin_country;
		this.originalLanguage = series.original_language;
		this.originalName     = series.original_name;
		this.overview         = series.overview;
		this.popularity       = series.popularity;
		this.posterPath       = series.poster_path;
		this.voteAverage      = series.vote_average;
		this.voteCount        = series.vote_count;
	}

	/**
	 * Get the alternative titles for the TV series
	 */
	getAlternativeTitles(language?: string) {
		return this.tmdb.tv.getSeriesAlternativeTitles(this.id, language);
	}

	/**
	 * Get the list of content ratings (certifications) for this TV show
	 */
	getContentRatings(language?: string) {
		return this.tmdb.tv.getSeriesContentRatings(this.id, language);
	}

	/**
	 * Get the credits for this TV show
	 */
	getCredits(language?: string) {
		return this.tmdb.tv.getSeriesCredits(this.id, language);
	}

	/**
	 * @TODO Clean up response type here (includes unnecessary additional info)
	 * Get all episode groups that have been created for this TV show
	 */
	getEpisodeGroups(language?: string) {
		return this.tmdb.tv.getSeriesEpisodeGroups(this.id, language);
	}

	/**
	 * Get the external IDs for this TV show
	 */
	getExternalIds(language?: string) {
		return this.tmdb.tv.getSeriesExternalIds(this.id, language);
	}

	/**
	 * Get a list of images for this TV show
	 */
	getImages(language?: string) {
		return this.tmdb.tv.getSeriesImages(this.id, language);
	}

	/**
	 * Get the list of keywords for this TV show
	 */
	getKeywords() {
		return this.tmdb.tv.getSeriesKeywords(this.id);
	}

	/**
	 * Get the list of TV show recommendations for this TV show
	 */
	getRecommendations(page?: number, language?: string) {
		return this.tmdb.tv.getSeriesRecommendations(this.id, page, language);
	}

	/**
	 * Get a list of similar TV shows
	 */
	getSimilarShows(page?: number, language?: string) {
		return this.tmdb.tv.getSimilarShows(this.id, page, language);
	}

	/**
	 * Get a list of seasons or episodes that have have been screened in a film festival or theater
	 */
	getTheatricalScreenings() {
		return this.tmdb.tv.getTheatricalScreenings(this.id);
	}

	/**
	 * Get the list of translations that exist for this TV show
	 */
	getTranslations(language?: string) {
		return this.tmdb.tv.getSeriesTranslations(this.id, language);
	}

	/**
	 * Get the videos htat have been added to this TV show
	 */
	getVideos(language?: string) {
		return this.tmdb.tv.getSeriesVideos(this.id, language);
	}

	/**
	 * @TODO
	 */
	rate(value: number) {
		this.tmdb.tv.rateSeries(this.id, value);
	}

	/**
	 * @TODO
	 */
	unrate() {
		this.tmdb.tv.unrateSeries(this.id);
	}

	/**
	 * @TODO
	 */
	// getChanges(page: number = 1, options: IChangesOptions) {
		// return this.tmdb.tv.
	// }
}

export class TvSeriesListing extends TvShow
{
	public readonly genreIds: number[];
	public readonly rating ?: number;

	/**
	 * Create an array of TV shows from JSON
	 */
	public static fromJson(movies: ISeries[], tmdb?: TMDb) {
		let result: TvSeriesListing[] = [];
		for (let movie of movies) {
			result.push(new TvSeriesListing(movie, tmdb));
		}
		return result;
	}

	constructor(series: ISeries, tmdb?: TMDb) {
		super(series, tmdb);
		this.genreIds = series.genre_ids;
		this.rating   = series.rating;
	}

	/**
	 * Get the details of the TV series
	 */
	getDetails() {
		return this.tmdb.tv.getSeriesDetails(this.id);
	}
}

export class TvSeriesDetails extends TvShow
{
	public readonly createdBy          : IMember[];
	public readonly runTime            : number[];
	public readonly genres             : IGenre[];
	public readonly episodeCount       : number;
	public readonly homepage           : string;
	public readonly isInProduction     : boolean;
	public readonly languages          : string[];
	public readonly lastAirDate        : Date;
	public readonly latestAiredEpisode : TvEpisodeListing;
	public readonly nextEpisodeToAir   : TvEpisodeListing | null;
	public readonly networks           : INetwork[];
	public readonly productionCompanies: IProductionCompany[];
	public readonly seasons            : TvSeasonListing[];
	public readonly seasonCount        : number;
	public readonly status             : string;
	public readonly type               : string;

	constructor(series: ISeriesDetails, tmdb?: TMDb) {
		super(series, tmdb);
		this.createdBy           = series.created_by;
		this.runTime             = series.episode_run_time;
		this.genres              = series.genres;
		this.episodeCount        = series.number_of_episodes;
		this.homepage            = series.homepage;
		this.isInProduction      = series.in_production;
		this.languages           = series.languages;
		this.lastAirDate         = new Date(series.last_air_date);
		this.latestAiredEpisode  = new TvEpisodeListing(series.last_episode_to_air);
		this.nextEpisodeToAir    = utils.classOrNull(series.next_episode_to_air, TvEpisodeListing);
		this.networks            = series.networks;
		this.productionCompanies = series.production_companies;
		this.seasons             = TvSeasonListing.fromJson(this.id, series.seasons);
		this.seasonCount         = series.number_of_seasons
		this.status              = series.status;
		this.type                = series.type;
	}
}
