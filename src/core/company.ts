import { ICompanyDetails,
         INetworkDetails }   from "./interface/company";
import { IAlternativeNames } from "./interface/info";
import { INetworkLogos }     from "./interface/media";
import { get }               from "./util/network";

export let company = {
	/**
	 * Get the details of a company
	 */
	getCompanyDetails(apiKey: string, companyId: number) {
		return get<ICompanyDetails>(apiKey, `company/${companyId}`);
	},

	/**
	 * Get a company's alternative names
	 */
	getCompanyAltNames(apiKey: string, companyId: number) {
		return get<IAlternativeNames>(apiKey, `company/${companyId}/alternative_names`);
	},

	/**
	 * Get images associated with a company
	 */
	getCompanyImages(apiKey: string, companyId: number) {
		return get<INetworkLogos>(apiKey, `company/${companyId}/images`);
	},

	/**
	 * Get the details of a network
	 */
	getNetworkDetails(apiKey: string, networkId: number) {
		return get<INetworkDetails>(apiKey, `network/${networkId}`);
	},

	/**
	 * Get a network's alternative names
	 */
	getNetworkAltNames(apiKey: string, networkId: number) {
		return get<IAlternativeNames>(apiKey, `network/${networkId}/alternative_names`);
	},

	/**
	 * Get images associated with a network
	 */
	getNetworkImages(apiKey: string, networkId: number) {
		return get<INetworkLogos>(apiKey, `network/${networkId}/images`);
	}
};
