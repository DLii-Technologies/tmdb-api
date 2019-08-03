import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { guest }                                          from "../../src/core";
import { IEpisodeResults, ISeriesResults, IMovieResults } from "../../src/core/interface/results";
import { IGuestSessionResponse }                          from "../../src/core/interface/response";

let guestSessionId: string;

describe("Guest Session API", () => {
	it("Create a guest session", () => {
		return guest.createSession(auth.api_key).then((result: IGuestSessionResponse) => {
			expect(result.success).to.equal(true);
			guestSessionId = result.guest_session_id;
		});
	});

	it("Get guest rated movies", () => {
		return guest.getRatedMovies(auth.api_key, guestSessionId).then((result: IMovieResults) => {
			expect(result.total_results).to.equal(0);
		});
	});

	it("Get guest rated TV shows", () => {
		return guest.getRatedTvShows(auth.api_key, guestSessionId).then((result: ISeriesResults) => {
			expect(result.total_results).to.equal(0);
		});
	});

	it("Get guest rated TV show episodes", () => {
		return guest.getRatedEpisodes(auth.api_key, guestSessionId).then((result: IEpisodeResults) => {
			expect(result.total_results).to.equal(0);
		});
	});
});
