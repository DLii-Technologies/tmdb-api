// import { MixinMovie } from "./mixin";
import { Mixin } from "ts-mixer";
import * as Mix from "./mixin";

/**
 * The TMDb module
 *
 * Each module within TMDb is comprised of mixins.
 * For example, all movie functionality comes from the `MixinMovie` mixin
 */
export class TMDb extends Mixin(Mix.MixinMovie, Mix.MixinTv)
{
	/**
	 * Store a singleton instance of TMDb
	 */
	private static __instance: TMDb;

	/**
	 * Get the current instance if it exists
	 */
	public static instance(throwIfUndefined: boolean = false) {
		if (TMDb.__instance == undefined && throwIfUndefined) {
			throw new ReferenceError("No TMDb instance has been defined");
		}
		return TMDb.__instance;
	}

	/**
	 * Create a new TMDb instance
	 */
	constructor(apiKey: string, useSingleton: boolean = true) {
		super(apiKey);
		if (useSingleton) {
			TMDb.__instance = this;
		}
	}

	/**
	 * Destroy the current TMDb instance
	 */
	destroy() {
		if (TMDb.__instance == this) {
			delete TMDb.__instance;
		}
	}
}
