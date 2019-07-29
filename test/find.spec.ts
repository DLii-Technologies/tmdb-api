import { expect } from "chai";
import "mocha";
import { tmdb } from "./config";
import { ExternalSource } from "../src/Enums";
import { FindResults } from "../src/Interfaces";

describe("Find API", () => {
	it("Find a TV show episode from IMDb ID", () => {
		return tmdb.find("tt4197088", ExternalSource.Imdb).then((result: FindResults) => {
			expect(result.tv_episode_results.length).to.equal(1);
			expect(result.tv_episode_results[0].name).to.equal("Member Berries");
		});
	});
});
