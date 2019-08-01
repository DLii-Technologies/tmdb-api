import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { GuestSessionResponse, MovieResults, EpisodeResults, SeriesResults } from "../src/Interfaces";

let guestSessionId: string;

describe("Guest Session API", () => {
	it("Create a guest session", () => {
		return tmdb.createGuestSession().then((result: GuestSessionResponse) => {
			expect(result.success).to.equal(true);
			guestSessionId = result.guest_session_id;
		});
	});

	it("Get guest rated movies", () => {
		return tmdb.getGuestRatedMovies(guestSessionId).then((result: MovieResults) => {
			expect(result.total_results).to.equal(0);
		});
	});

	it("Get guest rated TV shows", () => {
		return tmdb.getGuestRatedTvShows(guestSessionId).then((result: SeriesResults) => {
			expect(result.total_results).to.equal(0);
		});
	});

	it("Get guest rated TV show episodes", () => {
		return tmdb.getGuestRatedTvEpisodes(guestSessionId).then((result: EpisodeResults) => {
			expect(result.total_results).to.equal(0);
		});
	});
});
