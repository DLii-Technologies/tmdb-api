import { config }      from "dotenv";
import { should, use } from "chai";

/**
 * Load the environment configuration
 */
config();

/**
 * Setup Chai
 */
should();
use(require("chai-things"));
use(require("chai-subset"));

// -------------------------------------------------------------------------------------------------

import { account, auth as authentication } from "../src/core";

/**
 * Store some authentication details for testing
 */
export let auth = {
	api_key      : <string>process.env["TMDB_API_KEY"],
	account_id   : 0,
	session_id   : "",
	request_token: "",
	username     : <string>process.env["TMDB_USERNAME"],
	password     : <string>process.env["TMDB_PASSWORD"]
};

/**
 * Initialize the user session
 */
(async () => {
	try {
		auth.request_token = (await authentication.createRequestToken(auth.api_key)).request_token;
		await authentication.login(auth.api_key, auth.request_token, auth.username, auth.password);
		auth.session_id = (await authentication.createSession(auth.api_key, auth.request_token)).session_id;
		auth.account_id = (await account.getDetails(auth.api_key, auth.session_id)).id;
	} catch(e) {
		console.error(e);
		console.error("Initialization failed!");
		process.exit(1);
	}
	run();
})();

// -------------------------------------------------------------------------------------------------

import { TMDb } from "../src";

/**
 * Create a TMDb singleton
 */
new TMDb(auth.api_key);
