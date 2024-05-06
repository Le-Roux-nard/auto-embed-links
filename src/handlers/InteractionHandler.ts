import {
	BaseInteraction,
	Client,
	Interaction,
} from "discord.js";
import { client } from "../index";
export class InteractionHandler {
	private static _instance: InteractionHandler;
	private static client: Client;
	private static paused: boolean = false;
	private static handler = (interaction: BaseInteraction, ...args: any[]): void => {
		if (InteractionHandler.paused) return;
		
		if (interaction.isContextMenuCommand()) {
			let localInteraction = client.localCommands.get(interaction.commandType)?.get(interaction.commandName) ?? null;
			localInteraction?.execute(interaction as Interaction);
		}
	};
	public static start(): void {
		if (!InteractionHandler._instance) {
			InteractionHandler._instance = new InteractionHandler();
			client.on("interactionCreate", InteractionHandler.handler);
		}
	}
	public static pause(): void {
		InteractionHandler.paused = true;
	}
	public static resume(): void {
		InteractionHandler.paused = false;
	}
	public static stop(): void {
		client.removeListener("interactionCreate", InteractionHandler.handler);
	}
}
