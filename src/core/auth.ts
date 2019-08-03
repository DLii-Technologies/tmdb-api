import { IRequestTokenResponse, ICreateSessionResponse, IDeleteSessionResponse }
	from "./interface/response";
import { get, post, del } from "./util/network";

export let auth = {
	/**
	 * Create a temporary request token that can be used to validate a TMDb user login
	 */
	createRequestToken(apiKey: string) {
		return get<IRequestTokenResponse>(apiKey, `/authentication/token/new`);
	},

	/**
	 * Login and validate a request token
	 */
	login(apiKey: string, requestToken: string, username: string, password: string) {
		return post<IRequestTokenResponse>(apiKey,
				`/authentication/token/validate_with_login`, {}, {
				request_token: requestToken,
				username,
				password
			});
	},

	/**
	 * Create a new session
	 */
	createSession(apiKey: string, requestToken: string) {
		return post<ICreateSessionResponse>(apiKey, `/authentication/session/new`, {}, {
			request_token: requestToken,
		});
	},

	/**
	 * Delete or "logout" from a session
	 */
	deleteSession(apiKey: string, sessionId: string) {
		return del<IDeleteSessionResponse>(apiKey, `/authentication/session`, {}, {
			session_id: sessionId
		});
	}
};
