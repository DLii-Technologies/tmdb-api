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

console.log("Instance created");
