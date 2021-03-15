import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { TMDb } from "../../src";

describe.skip("TMDb: TMDb Instance", () => {
	it("Destroy current singleton instance", () => {
		TMDb.instance().destroy();
		expect(TMDb.instance()).to.equal(undefined);
	});
	it("Create a standalone instance", () => {
		let instance = new TMDb(auth.api_key, false);
		expect(TMDb.instance()).to.equal(undefined);
	});
	it("Create a new singleton instance", () => {
		new TMDb(auth.api_key);
		expect(TMDb.instance()).to.not.equal(undefined);
	});
});
