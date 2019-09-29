import TMDbMixin from "./TMDbMixin";

export class MixinTv extends TMDbMixin
{
	public tvMethod() {
		return this.apiKey;
	}
}
