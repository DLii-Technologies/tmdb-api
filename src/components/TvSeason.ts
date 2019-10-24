import { ISeasonDetails, ISeason } from "../core/interface/tv";
import { Component }               from "./Component";
import { TMDb }                    from "../TMDb";
import { TvEpisodeDetails }        from "./TvEpisode";
import utils                       from "../util";

class TvSeason extends Component
{
	public readonly airDate     : Date | null;
	public readonly id          : number;
	public readonly name        : string;
	public readonly overview    : string;
	public readonly posterPath  : string | null;
	public readonly seasonNumber: number;
	public readonly seriesId    : number;

	constructor(season: ISeason|ISeasonDetails, seriesId: number, tmdb?: TMDb) {
		super(tmdb);
		this.airDate      = utils.classOrNull(season.air_date, Date);
		this.id           = season.id;
		this.name         = season.name;
		this.overview     = season.overview;
		this.posterPath   = season.poster_path;
		this.seasonNumber = season.season_number;
		this.seriesId     = seriesId;
	}

	/**
	 * @TODO
	 */
	getAccountStates() {}
	getCredits() {}

	/**
	 * Get the list of external IDs for this season
	 */
	getExternalIds(language?: string) {
		return this.tmdb.tv.getSeasonExternalIds(this.seriesId, this.seasonNumber, language);
	}

	/**
	 * Get a list of images for this season
	 */
	getImages(language?: string) {
		return this.tmdb.tv.getSeasonImages(this.seriesId, this.seasonNumber, language);
	}

	/**
	 * Get a list of videos for this season
	 */
	getVideos(language?: string) {
		return this.tmdb.tv.getSeasonVideos(this.seriesId, this.seasonNumber, language);
	}
}

export class TvSeasonListing extends TvSeason
{
	public readonly episodeCount: number;

	constructor(series: ISeason, seriesId: number, tmdb?: TMDb) {
		super(series, seriesId, tmdb);
		this.episodeCount = series.episode_count;
	}

	/**
	 * Get the details of the TV season
	 */
	getDetails(language?: string) {
		return this.tmdb.tv.getSeasonDetails(this.seriesId, this.seasonNumber, language);
	}
}

export class TvSeasonDetails extends TvSeason
{
	public readonly episodes : TvEpisodeDetails[];

	constructor(series: ISeasonDetails, seriesId: number, tmdb?: TMDb) {
		super(series, seriesId, tmdb);
		this.episodes = utils.wrap(TvEpisodeDetails, series.episodes, tmdb);
	}
}
