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
}

/**
 * Initialize the user session
 */
authentication.createRequestToken(auth.api_key).then((result) => {
	auth.request_token = result.request_token;
	return authentication.login(auth.api_key, auth.request_token = result.request_token, auth.username, auth.password);
}).then((result) => {
	return authentication.createSession(auth.api_key, result.request_token);
}).then((result) => {
	auth.session_id = result.session_id;
	return account.getDetails(auth.api_key, auth.session_id);
}).then((result) => {
	auth.account_id = result.id;
	run(); // Start the tests
}).catch(e => {
	console.error(e);
	console.error("Initialization failed!");
	process.exit(1);
});
