import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { collection }              from "../../src/core";
import { ICollectionDetails }      from "../../src/core/interface/collections";
import { ICollectionTranslations } from "../../src/core/interface/language";
import { IImages }                 from "../../src/core/interface/media";

describe("Core: Collections API", () => {
	it("Get the details of a collection", () => {
		return collection.getDetails(auth.api_key, 10).then((result: ICollectionDetails) => {
			expect(result.name).to.equal("Star Wars Collection");
		});
	});

	it("Get the images for a collection", () => {
		return collection.getImages(auth.api_key, 10).then((result: IImages) => {
			expect(result.posters.length).to.be.greaterThan(0);
		});
	});

	it("Get the translations for a collection", () => {
		return collection.getTranslations(auth.api_key, 10).then((result: ICollectionTranslations) => {
			expect(result.translations).to.be.an("array");
		});
	});
});
