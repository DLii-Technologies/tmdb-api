import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { AlternativeNames, NetworkLogos, NetworkDetails } from "../src/Interfaces";

describe("Networks API", () => {
	it("Get the details of a network", () => {
		return tmdb.getNetworkDetails(213).then((result: NetworkDetails) => {
			expect(result.name).to.equal("Netflix");
		});
	});

	it("Get a network's alternative names", () => {
		return tmdb.getNetworkAltNames(174).then((result: AlternativeNames) => {
			result.results.should.include.something.with.property("name", "American Movie Classics");
		});
	});

	it("Get a network's images", () => {
		return tmdb.getNetworkImages(213).then((result: NetworkLogos) => {
			expect(result.logos.length).to.be.greaterThan(0);
		});
	});
});
