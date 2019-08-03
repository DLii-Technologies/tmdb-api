import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { people }                                      from "../../src/core";
import { IPersonDetails }                              from "../../src/core/interface/people";
import { IMovieCredits, ITvCredits, ICombinedCredits } from "../../src/core/interface/credits";
import { IPersonExternalIds }                          from "../../src/core/interface/external";
import { IPersonImages, ITaggedImageResults }          from "../../src/core/interface/media";
import { IPersonTranslations }                         from "../../src/core/interface/language";
import { IPersonResults }                              from "../../src/core/interface/results";

describe("People API", () => {
	it("Get the details of a person", () => {
		return people.getDetails(auth.api_key, 287).then((result: IPersonDetails) => {
			expect(result.name).to.equal("Brad Pitt");
			expect(result.known_for_department).to.equal("Acting");
		});
	});

	it("Get a person's movie credits", () => {
		return people.getMovieCredits(auth.api_key, 6384).then((result: IMovieCredits) => {
			result.cast.should.include.something.with.property("character", "John Wick");
		});
	});

	it("Get a person's TV credits", () => {
		return people.getTvCredits(auth.api_key, 34517).then((result: ITvCredits) => {
			result.crew.should.include.something.with.property("name", "South Park");
		});
	});

	it("Get a person's combined TV and movie credits", () => {
		return people.getCredits(auth.api_key, 34518).then((result: ICombinedCredits) => {
			result.cast.should.include.something.with.property("title", "Team America: World Police");
			result.crew.should.include.something.with.property("name", "South Park");
		});
	});

	it("Get a person's external IDs", () => {
		return people.getExternalIds(auth.api_key, 66633).then((result: IPersonExternalIds) => {
			expect(result.imdb_id).to.equal("nm0319213");
		});
	});

	it("Get images associated with a person", () => {
		return people.getImages(auth.api_key, 6384).then((result: IPersonImages) => {
			expect(result.profiles.length).to.be.greaterThan(0);
		});
	});

	it("Get tagged images associated with a person", () => {
		return people.getTaggedImages(auth.api_key, 6384).then((result: ITaggedImageResults) => {
			expect(result.results.length).to.be.greaterThan(0);
		});
	});

	it("Get translations associated with a person", () => {
		return people.getTranslations(auth.api_key, 6384).then((result: IPersonTranslations) => {
			expect(result.translations.length).to.be.greaterThan(0);
		});
	});

	it("Get the latest person on people", () => {
		return people.getLatestPerson(auth.api_key, ).then((result: IPersonDetails) => {
			expect(result.id).to.be.a("number");
		});
	});

	it("Get images associated with a person", () => {
		return people.getPopularPeople(auth.api_key, ).then((result: IPersonResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});
});
