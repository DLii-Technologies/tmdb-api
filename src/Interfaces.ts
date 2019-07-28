import { Status, VideoType, EpisodeGroupType } from "Enums";

export interface Response {
	status_code   : number;
	status_message: string;
}

// Shared -----------------------------------------------------------------------------------------

export interface AlternativeTitles {
	id    : number;
	titles: {
		iso_3166_1: string;
		title     : string;
		type      : string;
	}
}

export interface Member {
	id          : number;
	credit_id   : number;
	name        : string;
	gender      : number;
	profile_path: string | null; // @WARN In general shouldn't be null, only for extending
}

export interface GuestStar extends Member {
	character   : string;
	order       : number;
}

export interface CastMember extends GuestStar {
	cast_id     : number;
}

export interface CrewMember extends Member {
	department  : string;
	job         : string;
	profile_path: string;
}

export interface Credits {
	id: number;
	cast: CastMember[]
	crew: CrewMember[]
}

export interface Image {
	aspect_ratio: number;
	file_path   : string;
	height      : number;
	iso_639_1   : string | null;
	vote_average: number;
	vote_count  : number;
	width       : number;
}

export interface Images {
	id       : number;
	backdrops: Image[];
	posters  : Image[];
}

export interface SeasonImages {
	id       : number;
	posters  : Image[];
}

export interface EpisodeImages {
	id    : number;
	stills: Image[];
}

export interface Paginated {
	page         : number;
	results      : any[];
	total_pages  : number;
	total_results: number;
}

/**
 * Genre identification
 */
export interface Genre {
	id  : number;
	name: string;
}

/**
 * A production company
 */
export interface ProductionCompany {
	id            : number;
	logo_path     : string | null;
	name          : string;
	origin_country: string;
}

export interface ExternalIdList {
	id          : number;
	imdb_id     : string | null;
	facebook_id : string | null;
	instagram_id: string | null;
	twitter_id  : string | null;
}

export interface SeasonExternalIdList {
	freebase_mid: string | null;
	freebase_id : string | null;
	tvdb_id     : number | null;
	tvrage_id   : number | null;
}

export interface SeriesExternalIdList extends ExternalIdList, SeasonExternalIdList
{}

export interface EpisodeExternalIdList extends SeasonExternalIdList {
	imdb_id: string | null;
}

export interface Keyword {
	id  : number;
	name: string;
}

export interface Keywords {
	id      : number;
	keywords: Keyword[];
}

export interface Video {
	id        : string;
	iso_639_1 : string;
	iso_3166_1: string;
	key       : string;
	name      : string;
	site      : string;
	size      : number;
	type      : VideoType;
}

export interface VideoList {
	id     : number;
	results: Video[];
}

export interface Translation {
	iso_3166_1  : string;
	iso_639_1   : string;
	name        : string;
	english_name: string;
	data        : any;
}

export interface TranslationList {
	id     : number;
	results: Translation[];
}

// Lists ------------------------------------------------------------------------------------------

interface ListBase {
	description   : string;
	favorite_count: number;
	id            : number;
	item_count    : number;
	iso_639_1     : string;
	name          : string;
	poster_path   : string | null;
}

export interface List extends ListBase {
	list_type: string;
}

export interface ListDetails extends ListBase {
	created_by: string;
	items     : MovieListing[];
}

export interface Lists extends Paginated {
	results: List[];
}

export interface ListItemStatus {
	id          : string;
	item_present: boolean;
}

export interface ListCreateResponse extends Response {
	list_id: number;
	success: boolean;
}

// Account -----------------------------------------------------------------------------------------

export interface AccountDetails {
	avatar: {
		gravatar: {
			hash: string
		}
	},
	id           : number;
	iso_639_1    : string;
	iso_3166_1   : string;
	name         : string;
	include_adult: boolean;
	username     : string;
}

export interface AccountStates {
	id      : number;
	favorite: boolean;
	rated   : boolean | {
		value: number
	};
	watchlist: boolean;
}

// Movies ------------------------------------------------------------------------------------------

/**
 * A single production country
 */
export interface ProductionCountry {
	iso_3166_1: string,
	name      : string
}

/**
 * Information on a language
 */
export interface Language {
	iso_639_1: string,
	name     : string
}

interface MovieBase {
	adult            : boolean;
	backdrop_path    : string | null;
	id               : number;
	original_language: string;
	original_title   : string;
	popularity       : number;
	poster_path      : string | null;
	release_date     : string;
	runtime          : number | null;
	title            : string;
	video            : boolean;
	vote_average     : number;
	vote_count       : number;
}

export interface MovieListing extends MovieBase {
	genre_ids: number[];
	rating  ?: number;  // @WARN May cause issues later on... If so a new type needs to be made
}

/**
 * The raw serialized form of a Movie
 */
export interface MovieDetails extends MovieBase {
	belongs_to_collection: null; // Collection Object thing
	budget               : number;
	genres               : Genre[];
	homepage             : string | null;
	id                   : number;
	imdb_id              : string | null;
	original_language    : string;
	original_title       : string;
	overview             : string | null;
	popularity           : number;
	poster_path          : string | null;
	production_companies : ProductionCompany[];
	production_countries : ProductionCountry[];
	release_date         : string;
	revenue              : number;
	runtime              : number | null;
	spoken_languages     : Language[];
	status               : Status;
	tagline              : string | null;
	title                : string;
	video                : boolean;
	vote_average         : number;
	vote_count           : number;
}

export interface MovieChangeItem {
	id            : string;
	action        : string;
	time          : string;
	iso_639_1     : string;
	value         : string;
	original_value: string;
}

export interface MovieChange {
	key  : string;
	items: MovieChangeItem[];
}

export interface MovieChanges {
	changes: MovieChange[];
}

export interface MovieReleaseDate {
	certification: string;
	iso_639_1    : string;
	release_date : string;
	type         : number;
	note         : string;
}

export interface MovieReleaseDateResult {
	iso_3166_1   : string;
	release_dates: MovieReleaseDate[];
}

export interface MovieReleaseDates {
	id     : number;
	results: MovieReleaseDateResult[];
}

export interface MovieTranslation extends Translation {
	data        : {
		title   : string;
		overview: string;
		homepage: string;
	}
}

export interface MovieTranslationList extends TranslationList {
	translations: MovieTranslation[];
}

export interface MovieResults extends Paginated {
	results: MovieListing[];
}

/**
 * A single review
 */
export interface Review {
	id     : string;
	author : string;
	content: string;
	url    : string;
}

/**
 * A list of reviews
 */
export interface Reviews extends Paginated {
	id     : number;
	results: Review[];
}

export interface MovieLists extends Lists {
	id: number;
}

export interface MoviesResultsWithinDate extends MovieResults {
	dates: {
		minimum: string; // format: date
		maximum: string; // format: date
	}
}

// Networks ----------------------------------------------------------------------------------------

/**
 * @WARN Same as {ProductionCompany}
 */
export interface Network {
	name          : string;
	id            : number;
	logo_path     : string;
	origin_country: string
}

// TV Shows ----------------------------------------------------------------------------------------

export interface EpisodeTranslation {
	data : {
		name    : string;
		overview: string;
	}
}

export interface EpisodeTranslationList {
	id          : number;
	translations: EpisodeTranslation[];
}

export interface EpisodeChangeItem {
	id             : string;
	action         : string;
	time           : string;
	iso_639_1      : string;
	value          : string;
	original_value?: string;
}

export interface EpisodeChange {
	key  : string;
	items: EpisodeChangeItem[];
}

export interface EpisodeChanges {
	changes: EpisodeChange[];
}

export interface EpisodeCredits extends Credits {
	guest_stars: GuestStar[];
}

export interface EpisodeAccountState {
	id: number;
	rated: boolean | {
		value: number;
	}
}

interface EpisodeBase {
	air_date       : string;
	episode_number : number;
	name           : string;
	overview       : string;
	production_code: string | null;
	season_number  : number;
	still_path     : string | null;
	vote_average   : number;
	vote_count     : number;
}

export interface Episode extends EpisodeBase {
	episode_number : number;
	production_code: string;
	season_number  : number;
	show_id        : number; // Another one... Fo real?
	still_path     : string;
}

export interface EpisodeDetails extends EpisodeBase {
	crew           : CrewMember[];
	guest_stars    : GuestStar[];
	id             : number;
}

export interface EpisodeGroup {
	description  : string;
	episode_count: number;
	group_count  : number;
	id           : string;
	name         : string;
	network      : Network | null;
	type         : EpisodeGroupType;
}

export interface EpisodeGrouped extends Episode {
	order: number;
}

export interface EpisodeGroupItem {
	id      : string;
	name    : string;
	order   : number;
	episodes: EpisodeGrouped[];
}

export interface EpisodeGroupDetails extends EpisodeGroup {
	groups: EpisodeGroupItem[];

}

export interface EpisodeGroups {
	id     : number;
	results: EpisodeGroup[];
}

// TV Seasons --------------------------------------------------------------------------------------

export interface SeasonChangeItem {
	action        : string;
	id            : string;
	iso_639_1     : string;
	original_value: string;
	time          : string;
	value         : string | {
		episode_id    : number;
		episode_number: number;
	};
}

export interface SeasonChange {
	key  : string;
	items: SeasonChangeItem[];
}

export interface SeasonChanges {
	changes: SeasonChange[];
}

export interface SeasonBase {
	air_date     : string;
	id           : number;
	name         : string;
	overview     : string;
	poster_path  : string;
	season_number: number;
}

export interface SeasonListing extends SeasonBase {
	episode_count: number;
}

export interface SeasonDetails extends SeasonBase {
	_id     : string;
	episodes: EpisodeDetails[];
}

export interface SeasonAccountState {
	id            : number;
	episode_number: number;
	rated         : boolean | {
		value: number;
	}
}

export interface SeasonAccountStates {
	id     : number;
	results: SeasonAccountState[];
}

// TV Series ---------------------------------------------------------------------------------------

export interface SeriesChangeItem {
	action        : string;
	id            : string;
	iso_639_1     : string;
	original_value: string;
	time          : string;
	value         : string;
}

export interface SeriesChange {
	key  : string;
	items: SeriesChangeItem[];
}

export interface SeriesChanges {
	changes: SeriesChange[];
}

interface SeriesBase {
	backdrop_path    : string | null;
	first_air_date   : string;
	id               : number;
	name             : string;
	origin_country   : string[];
	original_language: string;
	original_name    : string;
	overview         : string;
	popularity       : number;
	poster_path      : string | null;
	vote_average     : number;
	vote_count       : number;
}

export interface SeriesListing extends SeriesBase {
	genre_ids        : number[];
}

export interface SeriesDetails extends SeriesBase {
	created_by          : Member[];
	episode_run_time    : number[];
	genres              : Genre[];
	homepage            : string;
	in_production       : boolean;
	languages           : string[];
	last_air_date       : string;
	last_episode_to_air : Episode;
	next_episode_to_air : Episode | null;
	networks            : Network[];
	production_companies: ProductionCompany[];
	seasons             : SeasonListing[];
	status              : string;
	type                : string;
}

export interface SeriesContentRating {
	iso_3166_1: string;
	rating    : string // TV-MA, 18+, etc.
}

export interface SeriesContentRatings {
	id     : number;
	results: SeriesContentRating[];
}

export interface SeriesResults extends Paginated {
	results: SeriesListing[];
}

export interface SeriesTheatricalScreening {
	id            : number;
	episode_number: number;
	season_number : number;
}

export interface SeriesTheatricalScreenings {
	id     : number;
	results: SeriesTheatricalScreening[];
}

export interface SeriesTranslation extends Translation {
	data: {
		name    : string;
		overview: string;
		homepage: string;
	}
}

export interface SeriesTranslationList extends TranslationList {
	translations: SeriesTranslation[];
}
