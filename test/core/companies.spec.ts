import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { company }          from "../../src/core";
import { ICompanyDetails, INetworkDetails }  from "../../src/core/interface/company";
import { INetworkLogos }    from "../../src/core/interface/media";
import { AlternativeNames } from "../../src/Interfaces";
import { IAlternativeNames } from "../../src/core/interface/info";

describe("Company API", () => {
	it("Get the details of a company", () => {
		return company.getCompanyDetails(auth.api_key, 1).then((result: ICompanyDetails) => {
			expect(result.name).to.equal("Lucasfilm");
		});
	});

	it("Get a company's alternative names", () => {
		return company.getCompanyAltNames(auth.api_key, 3).then((result: AlternativeNames) => {
			result.results.should.include.something.with.property("name", "Pixar Animation Studios");
		});
	});

	it("Get a company's images", () => {
		return company.getCompanyImages(auth.api_key, 1).then((result: INetworkLogos) => {
			expect(result.logos.length).to.be.greaterThan(0);
		});
	});

	it("Get the details of a network", () => {
		return company.getNetworkDetails(auth.api_key, 213).then((result: INetworkDetails) => {
			expect(result.name).to.equal("Netflix");
		});
	});

	it("Get a network's alternative names", () => {
		return company.getNetworkAltNames(auth.api_key, 174).then((result: IAlternativeNames) => {
			result.results.should.include.something.with.property("name", "American Movie Classics");
		});
	});

	it("Get a network's images", () => {
		return company.getNetworkImages(auth.api_key, 213).then((result: INetworkLogos) => {
			expect(result.logos.length).to.be.greaterThan(0);
		});
	});
});
