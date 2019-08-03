import "mocha";
import { auth } from "../init";

import { tv }                   from "../../src/core";
import { IEpisodeGroupDetails } from "../../src/core/interface/tv";

describe("TV Episode Groups", () => {
	it("Get episode group details", () => {
		return tv.getEpisodeGroupDetails(auth.api_key, "5ae2ad44c3a368768302d893").then((result: IEpisodeGroupDetails) => {
			result.groups.should.include.something.with.property("name", "Season 1");
		});
	});
});
