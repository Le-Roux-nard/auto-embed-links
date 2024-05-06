export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
	return keys.reduce((o, k) => ((o[k] = obj[k]), o), {} as Pick<T, K>);
}

export function randomString(len = 25): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < len; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function align(...entities: string[][]) {
	let _arr = [];
	let max = 0;

	for (const arr of entities) {
		if (arr.length > max) max = arr.length;
	}

	for (let i = 0; max > i; i++) {
		_arr.push("");
	}

	const addSpace = (num: number) => {
		let t = "";
		for (let i = 0; num > i; i++) {
			t += " ";
		}
		return t;
	};

	const maxLine = (arr: string[]) => {
		let m = 0;
		for (const str of arr) str.length > m ? (m = str.length) : m;
		return m;
	};

	for (const arr of entities) {
		let maxline = maxLine(arr);
		_arr = _arr.map((str) => {
			const up = arr.shift();
			str += up ? up + addSpace(maxline - up.length + 1) : addSpace(maxline + 1);
			return str;
		});
	}

	return (_arr = _arr.map((str) => str.trimEnd()));
}
