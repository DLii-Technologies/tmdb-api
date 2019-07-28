import { config } from "dotenv";
import { expect } from "chai";
import "mocha";

/**
 * Load the environment configuration
 */
config();

/**
 * Import modules to test
 */
import { Tmdb } from "../src";

// -------------------------------------------------------------------------------------------------

/**
 * Create the TMDB instance
 */
let tmdb = new Tmdb(<string>process.env["TMDB_API_KEY"]);
