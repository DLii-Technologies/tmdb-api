import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { PersonDetails, PersonChanges, MovieCredits, TvCredits, CombinedCredits, PersonExternalIdList, PersonImages, TaggedImages, PersonTranslationList, PersonResults } from "../src/Interfaces";

describe("People API", () => {
	it("Get the details of a person", () => {
		return tmdb.getPersonDetails(287).then((result: PersonDetails) => {
			expect(result.name).to.equal("Brad Pitt");
			expect(result.known_for_department).to.equal("Acting");
		});
	});

	it("Get the changes of a person", () => {
		return tmdb.getPersonChanges(287).then((result: PersonChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get a person's movie credits", () => {
		return tmdb.getPersonMovieCredits(6384).then((result: MovieCredits) => {
			result.cast.should.include.something.with.property("character", "John Wick");
		});
	});

	it("Get a person's TV credits", () => {
		return tmdb.getPersonTvCredits(34517).then((result: TvCredits) => {
			result.crew.should.include.something.with.property("name", "South Park");
		});
	});

	it("Get a person's combined TV and movie credits", () => {
		return tmdb.getPersonCredits(34518).then((result: CombinedCredits) => {
			result.cast.should.include.something.with.property("title", "Team America: World Police");
			result.crew.should.include.something.with.property("name", "South Park");
		});
	});

	it("Get a person's external IDs", () => {
		return tmdb.getPersonExternalIds(66633).then((result: PersonExternalIdList) => {
			expect(result.imdb_id).to.equal("nm0319213");
		});
	});

	it("Get images associated with a person", () => {
		return tmdb.getPersonImages(6384).then((result: PersonImages) => {
			expect(result.profiles.length).to.be.greaterThan(0);
		});
	});

	it("Get tagged images associated with a person", () => {
		return tmdb.getPersonTaggedImages(6384).then((result: TaggedImages) => {
			expect(result.results.length).to.be.greaterThan(0);
		});
	});

	it("Get translations associated with a person", () => {
		return tmdb.getPersonTranslations(6384).then((result: PersonTranslationList) => {
			expect(result.translations.length).to.be.greaterThan(0);
		});
	});

	it("Get the latest person on TMDb", () => {
		return tmdb.getLatestPerson().then((result: PersonDetails) => {
			expect(result.id).to.be.a("number");
		});
	});

	it("Get images associated with a person", () => {
		return tmdb.getPopularPeople().then((result: PersonResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});
});
