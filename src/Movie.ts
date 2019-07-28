/**
 * A wrapper for movies
 */
export class Movie
{
	/**
	 * Indicate if the movie is an adult movie
	 */
	public readonly isAdult: boolean;

	/**
	 * The backdrop path
	 */
	public readonly backdropPath: string | null;

	/**
	 * The collection this movie belongs to
	 */
	public readonly collection: null;                 // Collection Object thing

	/**
	 * The budget of the movie
	 */
	public readonly budget: number;

	/**
	 * The movie's genres
	 */
	public readonly genres: Genre[];

	/**
	 * Indicate if the movie has a video
	 */
	public readonly hasVideo: boolean;

	/**
	 * The homepage of the movie
	 */
	public readonly homepage: string | null;

	/**
	 * The TMDB movie ID
	 */
	public readonly id: number;

	/**
	 * The IMDB ID of the movie
	 */
	public readonly imdbId: string | null;

	/**
	 * The original language of the movie
	 */
	public readonly originalLanguage: string;

	/**
	 * The original title of the movie
	 */
	public readonly originalTitle: string;

	/**
	 * An overview of the movie
	 */
	public readonly overview: string | null;

	/**
	 * The popularity of the movie
	 */
	public readonly popularity: number;

	/**
	 * The poster path of the movie
	 */
	public readonly posterPath: string | null;

	/**
	 * The production companies of the movie
	 */
	public readonly productionCompanies: ProductionCompany[];

	/**
	 * The production countries of the movie
	 */
	public readonly productionCountries: ProductionCountry[];

	/**
	 * The release date of the movie
	 */
	public readonly releaseDate: Date;

	/**
	 * The total revenue of the movie
	 */
	public readonly revenue: number;

	/**
	 * The runtime of the movie in minutes
	 */
	public readonly runtime: number | null;

	/**
	 * The spoken languages in the movie
	 */
	public readonly spokenLanguages: Language[];

	/**
	 * The status of the movie production
	 */
	public readonly status: Status;

	/**
	 * The tagline of the movie
	 */
	public readonly tagline: string | null;

	/**
	 * The title of the movie
	 */
	public readonly title: string;

	/**
	 * The average vote for the moive
	 */
	public readonly voteAverage: number;

	/**
	 * The total vote count on the movie
	 */
	public readonly voteCount: number;

	/**
	 * Create a movie instance from a serialized instance
	 */
	public constructor(serialized: MovieSerialized) {
		this.isAdult             = serialized.adult;
		this.backdropPath        = serialized.backdrop_path;
		this.collection          = serialized.belongs_to_collection;
		this.budget              = serialized.budget;
		this.genres              = serialized.genres;
		this.homepage            = serialized.homepage;
		this.id                  = serialized.id;
		this.imdbId              = serialized.imdb_id;
		this.originalLanguage    = serialized.original_language;
		this.originalTitle       = serialized.original_title;
		this.overview            = serialized.overview;
		this.popularity          = serialized.popularity;
		this.posterPath          = serialized.poster_path;
		this.productionCompanies = serialized.production_companies;
		this.productionCountries = serialized.production_countries;
		this.releaseDate         = new Date(serialized.release_date);
		this.revenue             = serialized.revenue;
		this.runtime             = serialized.runtime;
		this.spokenLanguages     = serialized.spoken_languages;
		this.status              = serialized.status;
		this.tagline             = serialized.tagline;
		this.title               = serialized.title;
		this.hasVideo            = serialized.video;
		this.voteAverage         = serialized.vote_average;
		this.voteCount           = serialized.vote_count;
	}

	/**
	 * Delete your rating for the movie
	 *
	 * @TODO
	 */
	deleteRating() {

	}

	/**
	 * Get the list of images for the movie
	 *
	 * @TODO
	 */
	public images() {

	}

	/**
	 * Get the lists this movie belongs to
	 *
	 * @TODO
	 */
	public lists() {

	}

	/**
	 * Get the keywords for the movie
	 *
	 * @TODO
	 */
	public keywords() {

	}

	/**
	 * Rate the movie
	 *
	 * @TODO
	 */
	public rate() {

	}
}
