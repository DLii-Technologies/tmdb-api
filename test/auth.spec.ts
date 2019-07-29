import { expect } from "chai";
import "mocha";
import { auth, tmdb } from "./config";
import { GuestSessionResponse, CreateSessionResponse, RequestTokenResponse, DeleteSessionResponse } from "../src/Interfaces";

describe("Authentication API", () => {
	it("Create a guest session", () => {
		return tmdb.createGuestSession().then((result: GuestSessionResponse) => {
			expect(result.success).to.equal(true);
			auth.guest_session_id = result.guest_session_id;
		});
	});

	it("Create a request token", () => {
		return tmdb.createRequestToken().then((result: RequestTokenResponse) => {
			expect(result.success).to.equal(true);
			auth.request_token = result.request_token;
		});
	});

	it("Create a session via login credentials", () => {
		return tmdb.createSession(auth.request_token, auth.username, auth.password).then((result: CreateSessionResponse) => {
			expect(result.success).to.equal(true);
			auth.session_id = result.session_id;
		});
	});

	it("Create a session from validated request token", () => {
		return tmdb.createSession(auth.request_token).then((result: CreateSessionResponse) => {
			expect(result.success).to.equal(true);
			auth.session_id = result.session_id;
		});
	});

	it("Delete a session", () => {
		return tmdb.deleteSession(auth.session_id).then((result: DeleteSessionResponse) => {
			expect(result.success).to.equal(true);
		});
	});
});
