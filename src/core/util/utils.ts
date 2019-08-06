import { DiscoverSort, Sort, SortDirection } from "../../core/enums";

/**
 * Automatically format a URI that has path parameters
 */
export function uriF(uri: string, ...values: any[]) {
	return uri.replace(/\{[A-z]*\}/g, (i) => values.shift() || i);
}

/**
 * Generate a sort string given by the provided enums
 */
export function sortF(field?: Sort | DiscoverSort, direction: SortDirection = SortDirection.Asc) {
	return field ? `${field}.${direction}` : undefined;
}

/**
 * Attempt to access a property in an object. Return a default value if it does not exist
 */
export function optionalProperty(obj: any, prop: string, defaultValue?: any): any {
	return obj && obj[prop] || defaultValue;
}

/**
 * Format an array into a logical search string
 */
export function logicArrayF(arr?: any[] | any[][]) {
	if (arr === undefined) {
		return undefined;
	}
	if (Array.isArray(arr[0])) {
		let groups: string[] = [];
		arr.forEach((group: any[]) => groups.push(group.join(',')));
		return groups.join('|');
	}
	return arr.join(',');
}
