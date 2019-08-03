import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { info }                        from "../../src/core";
import { IGenres, IKeyword, IMovieCertifications, ITvCertifications, IApiConfiguration, ICountry,
	ITimezone, IJob }                  from "../../src/core/interface/info";
import { IWithId, IMovieResults }      from "../../src/core/interface/results";
import { IWithEnglishName, ILanguage } from "../../src/core/interface/language";

describe.only("Core: Information API", () => {
	it("Get API configuration", () => {
		return info.getApiConfiguration(auth.api_key).then((result: IApiConfiguration) => {
			expect(result.change_keys).to.include("birthday");
		});
	});
	it("Get list of all countries", () => {
		return info.getCountries(auth.api_key).then((result: ICountry[]) => {
			result.should.include.something.with.property("english_name", "Spain");
		});
	});
	it("Get list of all jobs", () => {
		return info.getJobs(auth.api_key).then((result: IJob[]) => {
			result.should.include.something.with.property("department", "Editing");
		});
	});
	it("Get list of all languages", () => {
		return info.getLanguages(auth.api_key).then((result: (ILanguage & IWithEnglishName)[]) => {
			result.should.include.something.with.property("iso_639_1", "af");
		});
	});
	it("Get list of primary translations", () => {
		return info.getPrimaryTranslations(auth.api_key).then((result: string[]) => {
			expect(result).to.include("en-US");
		});
	});
	it("Get list of timezones", () => {
		return info.getTimezones(auth.api_key).then((result: ITimezone[]) => {
			result.should.include.something.with.property("iso_3166_1", "AL");
		});
	});
	it("Get list of movie certifications", () => {
		return info.getMovieCertifications(auth.api_key).then((result: IMovieCertifications) => {
			expect(result.certifications.IN.length).to.be.greaterThan(0);
		});
	});

	it("Get list of TV certifications", () => {
		return info.getTvCertifications(auth.api_key).then((result: ITvCertifications) => {
			expect(result.certifications.KR.length).to.be.greaterThan(0);
		});
	});

	it("Get list of movie genres", () => {
		return info.getMovieGenreList(auth.api_key).then((result: IGenres) => {
			expect(result.genres.length).to.be.greaterThan(0);
		});
	});

	it("Get list of TV show genres", () => {
		return info.getTvGenreList(auth.api_key).then((result: IGenres) => {
			expect(result.genres.length).to.be.greaterThan(0);
		});
	});

	it("Get the details of a keyword", () => {
		return info.getKeywordDetails(auth.api_key, 3417).then((result: IKeyword) => {
			expect(result.id == 3417);
			expect(result.name).to.equal("wormhole");
		});
	});

	it("Get the movies that belong to a keyword", () => {
		return info.getMoviesWithKeyword(auth.api_key, 3417).then((result: IMovieResults & IWithId) => {
			expect(result.total_results).to.be.greaterThan(1);
			result.results.should.include.something.with.property("title", "Interstellar");
		});
	});
});
