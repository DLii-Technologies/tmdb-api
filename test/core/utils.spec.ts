import { expect } from "chai";
import "mocha";

/**
 * Import modules to test
 */
import "../../src/core/util/utils";
import { uriF, logicArrayF, optionalProperty } from "../../src/core/util/utils";

describe("Core: Utils", () => {
	it("Format URI", () => {
		expect(uriF("/account/{account_id}/details", undefined)).to.equal("/account/{account_id}/details");
		expect(uriF("/account/{account_id}/details", "test")).to.equal("/account/test/details");
		expect(uriF("/account/{media}/favorite/{}", null, "tv")).to.equal("/account/{media}/favorite/tv");
		expect(uriF("/account/favorite", "not there")).to.equal("/account/favorite");
	});

	it("Optional properties", () => {
		expect(optionalProperty(undefined, "test")).to.equal(undefined);
		expect(optionalProperty(undefined, "test", 10)).to.equal(10);
		expect(optionalProperty({}, "test")).to.equal(undefined);
		expect(optionalProperty({test: 5}, "test")).to.equal(5);
		expect(optionalProperty({test: 5}, "other", 10)).to.equal(10);
	});

	it("Logic Format URI", () => {
		expect(logicArrayF([1, 2, 3])).to.equal("1,2,3");
		expect(logicArrayF([[1, 2], [3, 4]])).to.equal("1,2|3,4");
		expect(logicArrayF([[1], [2], [3]])).to.equal("1|2|3");
	});
});
