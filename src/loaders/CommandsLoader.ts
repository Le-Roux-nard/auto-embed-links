import fs from "fs";
import { resolve } from "path";
import { client } from "../index";
import { ApplicationCommandData, ApplicationCommandType, Collection, Snowflake } from "discord.js";

export class Loader {
	private static commandsFolder = resolve(__dirname, "../interactions/Commands");
	public static async loadCommands({ deleteUnknownCommands = false }): Promise<void> {
		const folders = fs.readdirSync(this.commandsFolder);
		const files: string[] = [];

		for (const folder of folders) {
			const subFoldersFiles = fs.readdirSync(resolve(this.commandsFolder, folder));
			for (const file of subFoldersFiles) {
				files.push(resolve(this.commandsFolder, folder, file));
			}
		}
		const guildsCommands = new Map<Snowflake, Array<ApplicationCommandData>>();
		const globalCommands = new Array<ApplicationCommandData>();
		client.localCommands = new Collection<ApplicationCommandType, Collection<string, ApplicationCommandData>>();
		for await (const file of files) {
			import(file).then(({ default: command }: { [key: string]: ApplicationCommandData }) => {
				if (command.type) {
					let tempCollectionResult = client.localCommands.get(command.type) ?? new Collection<string, ApplicationCommandData>();
					tempCollectionResult.set(command.name, command);
					client.localCommands.set(command.type, tempCollectionResult);

					//si une commande n'a pas de guilds, on l'ajoute à tous les serveurs
					globalCommands.push(command);
				} else {
					console.error(`${command.name} n'a pas été chargé car aucun type n'est spécifié`);
				}
			});
		}

		let clientCommands = await client.application?.commands.fetch();
		for (const command of clientCommands?.values() ?? []) {
			let c = globalCommands?.find((c) => c.name == command.name);
			if (!c) {
				globalCommands.push(command.toJSON() as ApplicationCommandData);
			}
		}
		await client.application?.commands.set(globalCommands);
	}
}
