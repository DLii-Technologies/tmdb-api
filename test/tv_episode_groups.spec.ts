import "mocha";
import { tmdb } from "./init";
import { EpisodeGroupDetails } from "../src/Interfaces";

describe("TV Episode Groups", () => {
	it("Get episode group details", () => {
		return tmdb.getTvEpisodeGroupDetails("5ae2ad44c3a368768302d893").then((result: EpisodeGroupDetails) => {
			result.groups.should.include.something.with.property("name", "Season 1");
		});
	});
});
