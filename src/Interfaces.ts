import { Status, VideoType, EpisodeGroupType, MediaType } from "Enums";

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
	}[]
}

export interface AlternativeNames{
	id: number,
	titles: {
		name: string;
		type: string;
	}[];
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

export interface Logo extends Image {
	file_type: string;
}

export interface TaggedImage extends Image {
	id        : string;
	media     : MovieListing[] | SeriesListing[];
	media_type: string;
	image_type: string;
}

export interface Images {
	id       : number;
	backdrops: Image[];
	posters  : Image[];
}

export interface TaggedImages extends Paginated {
	results: TaggedImage[];
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

export interface Company {
	id       : number;
	logo_path: string | null;
	name     : string;
}

/**
 * A production company
 */
export interface ProductionCompany extends Company {
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

export interface KeywordList {
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

/**
 * A single review
 */
export interface ReviewListing {
	id     : string;
	author : string;
	content: string;
	url    : string;
}

export interface ReviewDetails extends ReviewListing {
	iso_639_1  : string;
	media_id   : number;
	media_title: string;
	media_type : MediaType;
}

/**
 * A list of reviews
 */
export interface Reviews extends Paginated {
	id     : number;
	results: ReviewListing[];
}

interface MediaModel {
	media_type?: MediaType;
}

// Collections -------------------------------------------------------------------------------------

/**
 * @WARN Very similar to `MovieBase`
 */
export interface CollectionPart {
	adult            : boolean;
	backdrop_path    : string | null;
	genre_ids        : number[];
	id               : number;
	original_language: string;
	original_title   : string;
	overview         : string;
	release_date     : string;
	poster_path      : string;
	popularity       : number;
	title            : string;
	video            : boolean;
	vote_average     : number;
	vote_count       : number;
}

export interface CollectionListing {
	id           : number;
	backdrop_path: string | null;
	name         : string;
	poster_path  : string | null;
}

export interface CollectionDetails extends CollectionListing {
	overview     : string;
	backdrop_path: string;
	parts        : CollectionPart[];
}

// Lists -------------------------------------------------------------------------------------------

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

interface MovieBase extends MediaModel {
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
	rating  ?: number;
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

export interface MovieLists extends Lists {
	id: number;
}

// Networks ----------------------------------------------------------------------------------------

/**
 * @WARN Same as {ProductionCompany}
 */
export interface Network {
	name          : string;
	id            : number;
	logo_path     : string;
	origin_country: string;
}

export interface NetworkLogos {
	id: number;
	logos: Image;
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
	id             : number; // May have issues with this ID being here, was in `EpisodeDetails`
	name           : string;
	overview       : string;
	production_code: string | null;
	season_number  : number;
	still_path     : string | null;
	vote_average   : number;
	vote_count     : number;
}

export interface EpisodeListing extends EpisodeBase {
	show_id: number;
}

export interface EpisodeDetails extends EpisodeBase {
	crew       : CrewMember[];
	guest_stars: GuestStar[];
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

export interface EpisodeGrouped extends EpisodeListing {
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

interface SeriesBase extends MediaModel {
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
	genre_ids: number[];
	rating  ?: number; // @WARN Only used when retrieving rated TV shows
}

export interface SeriesDetails extends SeriesBase {
	created_by          : Member[];
	episode_run_time    : number[];
	genres              : Genre[];
	homepage            : string;
	in_production       : boolean;
	languages           : string[];
	last_air_date       : string;
	last_episode_to_air : EpisodeListing;
	next_episode_to_air : EpisodeListing | null;
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

// Find --------------------------------------------------------------------------------------------

export interface FindResults {
	movie_results     : MovieListing[];
	person_results    : PersonListing[];
	tv_results        : SeriesListing[];
	tv_episode_results: EpisodeListing[];
	tv_season_results : SeasonListing[];
}

// Searching ---------------------------------------------------------------------------------------

export interface CompanyResults extends Paginated {
	results: Company[];
}

export interface CollectionResults extends Paginated {
	results: CollectionListing[];
}

export interface KeywordResults extends Paginated {
	results: Keyword[];
}

export interface MovieResults extends Paginated {
	results: MovieListing[];
}
export interface MoviesResultsWithinDate extends MovieResults {
	dates: {
		minimum: string; // format: date
		maximum: string; // format: date
	}
}

export interface CollectionSearchOptions {
	language?: string; // ISO 639-1 value to display translated data (if supported)
}

export interface MovieSearchOptions {
	include_adult       ?: boolean; // Include adult (pornographic) content in the results
	language            ?: string;  // ISO 639-1 value to display translated data (if supported)
	primary_release_year?: number;  // Specify the primary year the movie was released
	region              ?: string;  // Specify a ISO 3166-1 code to filter release dates
	year                ?: number;  // Specify the year the movie was released
}

export interface SeriesSearchOptions {
	first_air_date_year?: number; // Specify the year the series first aired
	language           ?: string; // ISO 639-1 value to display translated data (if supported)
}

export interface PersonSearchOptions {
	include_adult?: boolean; // Include adult (pornographic) content in the results
	language     ?: string;  // ISO 639-1 value to display translated data (if supported)
	region       ?: string;  // Specify a ISO 3166-1 code to filter release dates
}

export interface MultiSearchOptions {
	include_adult?: boolean; // Include adult (pornographic) content in the results
	language     ?: string;  // ISO 639-1 value to display translated data (if supported)
	region       ?: string;  // Specify a ISO 3166-1 code to filter release dates
}

export interface MultiSearchResults extends Paginated {
	results: MovieListing[] | SeriesListing[] | PersonListing[]
}

// People ------------------------------------------------------------------------------------------

export interface PersonImages {
	id      : number,
	profiles: Image[];
}

export interface PersonTranslation extends Translation {
	data: {
		biography: string;
	}
}

export interface PersonTranslationList {
	id          : number;
	translations: PersonTranslation[];
}

export interface PersonExternalIdList extends ExternalIdList{
	freebase_mid: string | null;
	freebase_id : string | null;
	tvrage_id   : number | null;
}

export interface PersonChangeItem {
	id             : string;
	action         : string;
	time           : string;
	original_value?: string;
}

export interface PersonChange {
	key  : string;
	items: PersonChangeItem[];
}

export interface PersonChanges {
	changes: PersonChange[];
}

interface PersonBase {
	adult       : boolean;
	popularity  : number;
	profile_path: string | null;
	id          : number;
	name        : string;
}

export interface PersonListing extends PersonBase, MediaModel {
	known_for: MovieListing[] | SeriesListing[];
}

export interface PersonResults extends Paginated {
	results: PersonListing[];
}

export interface PersonDetails extends PersonBase{
	also_known_as       : string[];
	biography           : string;
	birthday            : string | null;
	deathday            : string | null;
	gender              : number;
	homepage            : string | null;
	imdb_id             : string;
	known_for_department: string;
	place_of_birth      : string | null;
}

/**
 * Common attributes that are shared across all detailed reports
 */
interface MemberDetailsBase {
	backdrop_path: string | null;
	credit_id    : string;
	genre_ids    : number[];
	id           : number;
	overview     : string;
	popularity   : number;
	poster_path  : string | null;
	vote_average : number;
	vote_count   : number;
}

/**
 * Additional movie-specific attributes
 */
interface MovieMemberDetailsBase extends MemberDetailsBase {
	adult       : boolean;
	release_date: string;
	title       : string;
	video       : boolean
}

/**
 * Additional TV-specific attributes
 */
interface TvMemberDetailsBase extends MemberDetailsBase {
	episode_count    : number;
	first_air_date   : string;
	name             : string;
	origin_country   : string[];
	original_language: string;
	original_name    : string;
}

export interface MovieCastMemberDetails extends MovieMemberDetailsBase {
	character: string;
}

export interface MovieCrewMemberDetails extends MovieMemberDetailsBase {
	department       : string;
	job              : string;
	original_language: string;
	original_title   : string;
}

export interface TvCastMemberDetails extends TvMemberDetailsBase {
	character        : string;
}

export interface TvCrewMemberDetails extends TvMemberDetailsBase {
	department: string;
	job: string;
}


