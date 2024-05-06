export default interface Matcher {
	testRegex: RegExp;
	exec(str: string): string;
}
