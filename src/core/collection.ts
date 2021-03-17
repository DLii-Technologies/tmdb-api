import { ICollectionDetails }     from "./interface/collections";
import { get }                    from "./util/network";
import { IImages }                from "./interface/media";
import { ITranslations,
         ICollectionTranslation } from "./interface/language";

export let collection = {
	/**
	 * Get the details of a collection
	 */
	getDetails(apiKey: string, collectionId: number, language?: string) {
		return get<ICollectionDetails>(apiKey, `collection/${collectionId}`, { language });
	},

	/**
	 * Get the images for a collection
	 */
	getImages(apiKey: string, collectionId: number, language?: string) {
		return get<IImages>(apiKey, `collection/${collectionId}/images`, { language });
	},

	/**
	 * Get the list translations for a collection
	 */
	getTranslations(apiKey: string, collectionId: number, language?: string) {
		return get<ITranslations<ICollectionTranslation>>(apiKey,
			`collection/${collectionId}/translations`,
			{ language });
	}
};
