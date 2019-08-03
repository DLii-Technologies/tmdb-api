import { expect } from "chai";
import "mocha";

/**
 * Import modules to test
 */
import "../../src/core/util/utils";
import { uriF } from "../../src/core/util/utils";

describe("Core: Utils", () => {
	it("Format URI", () => {
		expect(uriF("/account/{account_id}/details", undefined)).to.equal("/account/{account_id}/details");
		expect(uriF("/account/{account_id}/details", "test")).to.equal("/account/test/details");
		expect(uriF("/account/{media}/favorite/{}", null, "tv")).to.equal("/account/{media}/favorite/tv");
		expect(uriF("/account/favorite", "not there")).to.equal("/account/favorite");
	});
});
