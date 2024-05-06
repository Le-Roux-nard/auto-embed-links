import Matcher from "../Matcher";

export default class TwitterMatcher implements Matcher {
	testRegex = /(?<=\bhttps?:\/\/(?:www\.)?)twitter|x(?=\.com\/.+?\/status\/\d+\b)/g;

	exec(str: string): string {
		return str.replace(this.testRegex, "fxtwitter");
	}
}
