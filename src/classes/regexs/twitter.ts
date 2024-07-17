import Matcher from "../Matcher";

export default class TwitterMatcher implements Matcher {
	testRegex = /(?<=\bhttps?:\/\/(?:www\.)?)twitter|(?<=[^A-Za-z-0-9])x(?=\.com\/.+?\/status\/\d+\b)/g;

	exec(str: string): string {
		return str.replace(this.testRegex, "fxtwitter");
	}
}
