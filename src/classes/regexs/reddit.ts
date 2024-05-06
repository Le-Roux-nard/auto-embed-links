import Matcher from "../Matcher";

export default class RedditMatcher implements Matcher {
	testRegex = /\bhttps?:\/\/(?:www\.)?(?:[\w-]+?\.)?reddit\.com(?:\/r\/|\/user\/)?([\w:\.]{2,21})?(?:\/comments\/)?(\w{5,9})?(?:\/[\w%\\-]+)?(\/\w{3,9})?\/?(?:\?(\S+))?(?:\#(\S+))?/g;

	exec(str: string): string {
		if(!this.testRegex.test(str)) return str;
		return str.replace("reddit.com", "rxddit.com");
	}
}
