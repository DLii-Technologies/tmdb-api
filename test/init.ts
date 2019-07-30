import { config } from "dotenv";
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

/**
 * Import modules to test
 */
import { TMDb } from "../src";

// -------------------------------------------------------------------------------------------------

/**
 * Create the TMDB instance
 */
export let tmdb = new TMDb(<string>process.env["TMDB_API_KEY"]);

/**
 * Store some authentication details for testing
 */
export let auth = {
	account_id   : 0,
	session_id   : "",
	request_token: "",
	username     : <string>process.env["TMDB_USERNAME"],
	password     : <string>process.env["TMDB_PASSWORD"]
}

/**
 * Initialize the user session
 */
tmdb.createRequestToken().then((result) => {
	auth.request_token = result.request_token;
	return tmdb.validateRequestToken(auth.request_token = result.request_token, auth.username, auth.password);
}).then((result) => {
	return tmdb.createSession(result.request_token);
}).then((result) => {
	auth.session_id = result.session_id;
	return tmdb.getAccountDetails(auth.session_id);
}).then((result) => {
	auth.account_id = result.id;
	run(); // Start the tests
}).catch(e => {
	console.error(e);
	console.error("Initialization failed!");
	process.exit(1);
});
