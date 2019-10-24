import { Component }                 from "./Component";
import { IEpisode, IEpisodeDetails } from "../core/interface/tv";
import { TMDb }                      from "../TMDb";
import { ICrewMember, IGuestStar }   from "../core/interface/credits";

class TvEpisode extends Component
{
	public readonly airDate       : Date;
	public readonly episodeNumber : number;
	public readonly seriesId      : number;
	public readonly name          : string;
	public readonly overview      : string;
	public readonly productionCode: string | null;
	public readonly seasonNumber  : number;
	public readonly stillPath     : string | null;
	public readonly voteAverage  : number;
	public readonly voteCount    : number;

	constructor(episode: IEpisode|IEpisodeDetails, tmdb?: TMDb) {
		super(tmdb);
		this.airDate        = new Date(episode.air_date);
		this.episodeNumber  = episode.episode_number;
		this.seriesId       = episode.id;
		this.name           = episode.name;
		this.overview       = episode.overview;
		this.productionCode = episode.production_code;
		this.seasonNumber   = episode.season_number;
		this.stillPath      = episode.still_path;
		this.voteAverage    = episode.vote_average;
		this.voteCount      = episode.vote_count;
	}
}

export class TvEpisodeListing extends TvEpisode
{
	public readonly showId: number;

	constructor(episode: IEpisode, tmdb?: TMDb) {
		super(episode, tmdb);
		this.showId = episode.show_id;
	}

	/**
	 * Get the details of the TV series
	 */
	getDetails(language?: string) {

	}
}

export class TvEpisodeDetails extends TvEpisode
{
	public readonly crew : ICrewMember[];
	public readonly guestStars: IGuestStar[];

	constructor(episode: IEpisodeDetails, tmdb?: TMDb) {
		super(episode, tmdb);
		this.crew       = episode.crew;
		this.guestStars = episode.guest_stars;
	}
}
