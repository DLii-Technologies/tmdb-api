import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { auth as authentication } from  "../../src/core";
import { IRequestTokenResponse, ICreateSessionResponse, IDeleteSessionResponse }
	from "../../src/core/interface/response";

let requestToken: string;
let sessionId   : string;

describe("Authentication API", () => {
	it("Create a request token", () => {
		return authentication.createRequestToken(auth.api_key).then((result: IRequestTokenResponse) => {
			expect(result.success).to.equal(true);
			expect(Boolean(result.request_token)).to.equal(true);
			requestToken = result.request_token;
		});
	});

	it("Create a session via login credentials", () => {
		return authentication.login(auth.api_key, requestToken, auth.username, auth.password).then((result: IRequestTokenResponse) => {
			expect(result.success).to.equal(true);
			expect(Boolean(result.request_token)).to.equal(true);
			requestToken = result.request_token;
		});
	});

	it("Create a session from validated request token", () => {
		return authentication.createSession(auth.api_key, requestToken).then((result: ICreateSessionResponse) => {
			expect(result.success).to.equal(true);
			expect(Boolean(result.session_id)).to.equal(true);
			sessionId = result.session_id;
		});
	});

	it("Delete a session", () => {
		return authentication.deleteSession(auth.api_key, sessionId).then((result: IDeleteSessionResponse) => {
			expect(result.success).to.equal(true);
		});
	});
});
