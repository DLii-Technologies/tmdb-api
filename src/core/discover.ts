import { IMovieResults }         from "./interface/results";
import { MediaType, TimeWindow } from "./enums";
import { get }                   from "./util/network";

export let discover = {
	/**
	 * Get a list of trending media
	 */
	getTrending(apiKey: string, mediaType: MediaType, timeWindow: TimeWindow) {
		return get<IMovieResults>(apiKey, `/trending/${mediaType}/${timeWindow}`);
	}
};
