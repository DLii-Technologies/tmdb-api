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
import { Tmdb } from "../src";

// -------------------------------------------------------------------------------------------------

/**
 * Create the TMDB instance
 */
export let tmdb = new Tmdb(<string>process.env["TMDB_API_KEY"]);

console.log("Instance created");
