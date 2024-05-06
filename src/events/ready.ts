import { Client, ClientUser } from "discord.js";
import { Loader } from "../loaders/CommandsLoader";
import { InteractionHandler } from "../handlers/InteractionHandler";

export default async (client: Client) => {
	console.log(`Logged in as ${client?.user?.tag} !`);
	await Loader.loadCommands({ deleteUnknownCommands: true });
	await client.user?.setPresence({ activities: [], status: "online" });
	InteractionHandler.start();
};
