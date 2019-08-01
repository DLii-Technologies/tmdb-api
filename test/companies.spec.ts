import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { CompanyDetails, AlternativeNames, NetworkLogos } from "../src/Interfaces";

describe("Company API", () => {
	it("Get the details of a company", () => {
		return tmdb.getCompanyDetails(1).then((result: CompanyDetails) => {
			expect(result.name).to.equal("Lucasfilm");
		});
	});

	it("Get a company's alternative names", () => {
		return tmdb.getCompanyAltNames(3).then((result: AlternativeNames) => {
			result.results.should.include.something.with.property("name", "Pixar Animation Studios");
		});
	});

	it("Get a company's images", () => {
		return tmdb.getCompanyImages(1).then((result: NetworkLogos) => {
			expect(result.logos.length).to.be.greaterThan(0);
		});
	});
});
