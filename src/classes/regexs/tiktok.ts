import Matcher from "../Matcher";

export default class TikTokMatcher implements Matcher {
	testRegex = /vm\.tiktok\.com(?=\/.+?\b\/)|(?:www\.)?tiktok\.com(?=\/@[A-Za-z_0-9]+\/video\/\d+)/g;

	exec(str: string): string {
		return str.replace(this.testRegex, "vm.vxtiktok.com");
	}
}
