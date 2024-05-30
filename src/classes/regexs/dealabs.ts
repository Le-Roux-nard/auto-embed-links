import Matcher from "../Matcher";

export default class DealabsMatcher implements Matcher {
	// testRegex = /\bhttps?:\/\/(?:www\.)?(?:[\w-]+?\.)?dealabs\.com\/(?!discussions\/).*\/(?=.*?(\d{3,})\b)/g;
	testRegex = /\bhttps?:\/\/(?:www\.)?(?:[\w-]+?\.)?dealabs\.com\/(?!discussions\/).*\W(\d+)\b/g;

	exec(str: string): string {
		if(!this.testRegex.test(str)) return str;
		return str.replace("dealabs.com", "fxdealabs.com");
	}
}
