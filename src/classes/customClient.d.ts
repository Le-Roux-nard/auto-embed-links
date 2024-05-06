import { Client, Collection, ApplicationCommandType, ApplicationCommandData } from "discord.js";

declare module "discord.js" {
	export interface Client {
		localCommands: Collection<ApplicationCommandType, Collection<string, ApplicationCommandData>>;
	}
}
