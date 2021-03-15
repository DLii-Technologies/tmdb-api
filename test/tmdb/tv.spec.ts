import { expect } from "chai";
import "mocha";

/**
 * Modules to test
 */
import { TMDb, TvSeriesListing, TvSeriesDetails, TvSeasonDetails } from "../../src";
import { VideoType }                              from "../../src/core/enums";

/**
 * Grab the current TMDb instance
 */
let tmdb = TMDb.instance();
let listing: TvSeriesListing;
let details: TvSeriesDetails;
let seasonDetails: TvSeasonDetails;

describe.skip("TMDb: TV Module", () => {

	// TV Shows ------------------------------------------------------------------------------------

	it("Get the latest TV show added on TMDb", () => {
		return tmdb.tv.getLatestSeries().then((result) => {
			expect(result).to.be.an.instanceOf(TvSeriesDetails);
		});
	});
	it("Get the list of TV shows airing today", () => {
		return tmdb.tv.getShowsAiringToday().then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(TvSeriesListing);
		});
	});
	it("Get the list of TV shows on air", () => {
		return tmdb.tv.getShowsOnAir().then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(TvSeriesListing);
		});
	});
	it("Get a list of popular TV shows", () => {
		return tmdb.tv.getPopularShows().then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(TvSeriesListing);
		});
	});
	it("Get the top rated shows on TMDb", () => {
		return tmdb.tv.getTopRatedShows().then((result) => {
			expect(result.totalResults).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(TvSeriesListing);
		});
	});
	it("Search for a TV show", () => {
		return tmdb.tv.search("South Park").then((results) => {
			expect(results.results[0].id).to.equal(2190);
			listing = results.results[0];
		});
	});
	it("Get the details of a TV show", () => {
		return listing.getDetails().then((series) => {
			expect(series).to.be.an.instanceOf(TvSeriesDetails);
			details = series;
		});
	});
	it("Get alternative titles for a TV show", () => {
		return details.getAlternativeTitles().then((result) => {
			result.should.include.something.with.property("title", "Southpark");
		});
	});
	it("Get a TV show's content ratings", () => {
		return details.getContentRatings().then((result) => {
			result.should.include.something.with.property("rating", "TV-MA");
		});
	});
	/**
	 * @TODO Credits
	 */
	// it("Get the credits for a TV show", () => {

	// });
	it("Get a TV show's episode groups", () => {
		return details.getEpisodeGroups().then((result) => {
			expect(result).to.be.an("array");
		});
	});
	it("Get a TV show's external ID's", () => {
		return details.getExternalIds().then((result) => {
			expect(result.imdb_id).to.equal("tt0121955");
		});
	});
	it("Get images for a TV show", () => {
		return details.getImages().then((result) => {
			expect(result.backdrops).to.be.an("array");
			expect(result.posters).to.be.an("array");
		});
	});
	it("Get a TV show's keywords", () => {
		return details.getKeywords().then((result) => {
			result.should.include.something.with.property("name", "adult humor");
		});
	});
	it("Get recommended TV shows", () => {
		return details.getRecommendations().then((result) => {
			expect(result.results.length).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(TvSeriesListing);
		});
	});
	it("Get similar TV shows", () => {
		return details.getSimilarShows().then((result) => {
			expect(result.results.length).to.be.greaterThan(0);
			expect(result.results[0]).to.be.an.instanceOf(TvSeriesListing);
		});
	});
	it("Get a TV show's theatrical screenings", () => {
		return details.getTheatricalScreenings().then((result) => {
			result.should.include.something.with.property("id", 6708);
		});
	});
	it("Get a TV show's translations", () => {
		return details.getTranslations().then((result) => {
			result.should.include.something.with.property("english_name", "French");
		});
	});
	it("Get a TV show's videos", () => {
		return details.getVideos().then((result) => {
			result.should.include.something.with.property("type", VideoType.OpeningCredits);
		});
	});

	// TV Seasons ----------------------------------------------------------------------------------

	it("Get a TV show's season's details", () => {
		return details.seasons[14].getDetails().then((result) => {
			seasonDetails = result;
			expect(result.seriesId).to.equal(details.id);
			expect(result.episodes.length).to.equal(14);
		});
	});
	/**
	 * @TODO
	 */
	// it("Get a TV show's season's changes", () => {});
	// it("Get season account states", () => {});
	// it("Get season credits", () => {});

	it("Get a TV show's season's external ID's", () => {
		return seasonDetails.getExternalIds().then((result) => {
			expect(result.tvdb_id).to.equal(195781);
		});
	});
	it("Get a TV show's season's images", () => {
		return seasonDetails.getImages().then((result) => {
			expect(result.posters).to.be.an("array");
			expect(result.posters.length).to.be.greaterThan(0);
		});
	});
	it("Get a TV show's season's videos", () => {
		return seasonDetails.getVideos().then((result) => {
			expect(result).to.be.an("array");
		});
	});

	// TV Episodes ---------------------------------------------------------------------------------

	// it("Get a TV show's season's episodes", () => {
	// 	return seasonDetails.getImages().then((result) => {
	// 		expect(result.posters.length).to.be.greaterThan(0);
	// 	});
	// });
});
