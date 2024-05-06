import { client } from "src/index";

declare module "discord.js" {
	export interface BaseApplicationCommandData {
		execute: (interaction: Interaction, ...args: any[]) => Promise<void>;
	}
}