import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Testing modules
 */
import { movie }                         from "../../src/core";
import { IAlternativeTitles, IKeywords } from "../../src/core/interface/info";
import { IAccountState }                 from "../../src/core/interface/account";
import { ICredits }                      from "../../src/core/interface/credits";
import { IExternalIds }                  from "../../src/core/interface/external";
import { IImages }                       from "../../src/core/interface/media";

describe("Core: Movie API", () => {
	it("Get a movie's details", () => {
		return movie.getDetails(auth.api_key, 235);
	});

	it("Get a movie's account states", () => {
		return movie.getAccountState(auth.api_key, 278, auth.session_id).then((result: IAccountState) => {
			expect(result.rated).to.not.equal(undefined);
		});
	});

	it("Get a movie's alternative titles", () => {
		return movie.getAltTitles(auth.api_key, 813).then((result: IAlternativeTitles) => {
			expect(result.titles.length).to.be.greaterThan(0);
			result.titles.should.include.something.that.has.property("title", "Flying High");
		});
	});

	it("Get a movie's credits", () => {
		return movie.getCredits(auth.api_key, 235).then((result: ICredits) => {
			result.cast.should.include.something.that.has.property("name", "Wil Wheaton");
		});
	});

	it("Get a movie's external IDs", () => {
		return movie.getExternalIds(auth.api_key, 472269).then((result: IExternalIds) => {
			expect(result.imdb_id).to.equal("tt6081670");
		});
	});

	it("Get a movie's images", () => {
		return Promise.all([
			movie.getImages(auth.api_key, 346364).then((result: IImages) => {
				expect(result.backdrops.length).to.be.greaterThan(0);
				expect(result.posters.length).to.be.greaterThan(0);
			}),
			movie.getImages(auth.api_key, 346364, "en", ["en"]).then((result: IImages) => {
				expect(result.backdrops.length).to.be.greaterThan(0);
				expect(result.posters.length).to.be.greaterThan(0);
			}),
		]);
	});

	it("Get a movie's keywords", () => {
		return movie.getKeywords(auth.api_key, 497).then((result: IKeywords) => {
			result.keywords.should.include.something.that.has.property("name", "electric chair");
		});
	});

	it("Get a movie's release dates", () => {
		return movie.getReleaseDates(auth.api_key, 680);
	});

	it("Get a movie's videos", () => {
		return movie.getVideos(auth.api_key, 521029);
	});

	it("Get a movie's translations", () => {
		return movie.getTranslations(auth.api_key, 19185);
	});

	it("Get a movie's recommended movies", () => {
		return movie.getRecommendations(auth.api_key, 396940);
	});

	it("Get similar movies to a movie", () => {
		return movie.getSimilar(auth.api_key, 396940);
	});

	it("Get the lists a movie belongs to", () => {
		return movie.getLists(auth.api_key, 156022);
	});

	it("Rate a movie", () => {
		return movie.rate(auth.api_key, 260513, 8, auth.session_id);
	});

	it("Delete a rating from a movie", () => {
		return movie.unrate(auth.api_key, 260513, auth.session_id);
	});

	it("Get the latest movie", () => {
		return movie.getLatest(auth.api_key);
	});

	it("Get movies now playing", () => {
		return movie.getNowPlaying(auth.api_key);
	});

	it("Get popular movies", () => {
		return movie.getPopular(auth.api_key);
	});

	it("Get top rated movies", () => {
		return movie.getTopRated(auth.api_key);
	});

	it("Get upcoming movies", () => {
		return movie.getUpcoming(auth.api_key);
	});
});
