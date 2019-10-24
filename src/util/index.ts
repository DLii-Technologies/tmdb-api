// export function applyMixins(derivedCtor: any, baseCtors: any[]) {
// 	baseCtors.forEach(baseCtor => {
// 		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
// 			Object.defineProperty(derivedCtor.prototype, name, <PropertyDescriptor>Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
// 		});
// 	});
// }

export default {
	/**
	 * Create an instance of a class assuming the given value parameter is not null
	 */
	classOrNull<T>(value: any, classReference: {new (...args: any[]): T}) {
		return value ? new classReference(value) : null;
	}
}
