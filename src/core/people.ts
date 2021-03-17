import { get }                 from "./util/network";
import { IMovieCredits,
         ITvCredits,
         ICombinedCredits }    from "./interface/credits";
import { IPersonDetails }      from "./interface/people";
import { IPersonExternalIds }  from "./interface/external";
import { IPersonImages,
         ITaggedImageResults } from "./interface/media";
import { IPersonResults }      from "./interface/results";
import { ITranslations,
         IPersonTranslation }  from "./interface/language";

export let people = {
	/**
	 * Get details of a person
	 */
	getDetails(apiKey: string, personId: number, language?: string) {
		return get<IPersonDetails>(apiKey, `person/${personId}`, { language });
	},

	/**
	 * Get the movie credits for a person
	 */
	getMovieCredits(apiKey: string, personId: number, language?: string) {
		return get<IMovieCredits>(apiKey, `person/${personId}/movie_credits`, { language });
	},

	/**
	 * Get the TV credits for a person
	 */
	getTvCredits(apiKey: string, personId: number, language?: string) {
		return get<ITvCredits>(apiKey, `person/${personId}/tv_credits`, { language });
	},

	/**
	 * Get movie and TV credits for a person
	 */
	getCredits(apiKey: string, personId: number, language?: string) {
		return get<ICombinedCredits>(apiKey, `person/${personId}/combined_credits`,
			{ language });
	},

	/**
	 * Get the external IDs of a person
	 */
	getExternalIds(apiKey: string, personId: number, language?: string) {
		return get<IPersonExternalIds>(apiKey, `person/${personId}/external_ids`, { language });
	},

	/**
	 * Get images for a person
	 */
	getImages(apiKey: string, personId: number) {
		return get<IPersonImages>(apiKey, `person/${personId}/images`);
	},

	/**
	 * Get tagged images for a person
	 */
	getTaggedImages(apiKey: string, personId: number, page?: number, language?: string) {
		return get<ITaggedImageResults>(apiKey, `person/${personId}/tagged_images`,
			{ page, language });
	},

	/**
	 * Get a list of translations that have been created for a person
	 */
	getTranslations(apiKey: string, personId: number, language?: string) {
		return get<ITranslations<IPersonTranslation>>(apiKey, `person/${personId}/translations`,
		{ language });
	},

	/**
	 * Get the most newly created person
	 */
	getLatestPerson(apiKey: string, language?: string) {
		return get<IPersonDetails>(apiKey, `person/latest`, { language });
	},

	/**
	 * Get a list of popular people on TMDb
	 */
	getPopularPeople(apiKey: string, page?: number, language?: string) {
		return get<IPersonResults>(apiKey, `person/popular`, { language, page });
	}
};
