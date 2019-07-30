import { expect } from "chai";
import "mocha";
import { auth, tmdb } from "./init";
import { GuestSessionResponse, CreateSessionResponse, RequestTokenResponse, DeleteSessionResponse } from "../src/Interfaces";

let requestToken: string;
let sessionId   : string;

describe("Authentication API", () => {
	it("Create a guest session", () => {
		return tmdb.createGuestSession().then((result: GuestSessionResponse) => {
			expect(result.success).to.equal(true);
		});
	});

	it("Create a request token", () => {
		return tmdb.createRequestToken().then((result: RequestTokenResponse) => {
			expect(result.success).to.equal(true);
			expect(Boolean(result.request_token)).to.equal(true);
			requestToken = result.request_token;
		});
	});

	it("Create a session via login credentials", () => {
		return tmdb.validateRequestToken(requestToken, auth.username, auth.password).then((result: RequestTokenResponse) => {
			expect(result.success).to.equal(true);
			expect(Boolean(result.request_token)).to.equal(true);
			requestToken = result.request_token;
		});
	});

	it("Create a session from validated request token", () => {
		return tmdb.createSession(requestToken).then((result: CreateSessionResponse) => {
			expect(result.success).to.equal(true);
			expect(Boolean(result.session_id)).to.equal(true);
			sessionId = result.session_id;
		});
	});

	it("Delete a session", () => {
		return tmdb.deleteSession(sessionId).then((result: DeleteSessionResponse) => {
			expect(result.success).to.equal(true);
		});
	});
});
