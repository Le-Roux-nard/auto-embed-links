import { resolve } from "path";
import { readdirSync } from "fs";
import { client } from "../index";

export class EventLoader {
	public static async loadEvents(): Promise<void> {
		const files = await readdirSync(resolve(__dirname, "../events"));
		for await (const file of files) {
			const { default: event } = await import(resolve(__dirname, "../events", file));
			client.on(file.split(".")[0], event.bind(null, client));
		}
	}
}
