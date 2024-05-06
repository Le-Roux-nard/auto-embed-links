import {
	ApplicationCommandType,
	ApplicationCommandData,
	MessageContextMenuCommandInteraction,
	GuildTextBasedChannel,
	ThreadChannel,
} from "discord.js";
import NumberToInvisibleChar from "../../../utils/NumberToInvisibleChar";

const IdToInvisibleChars = NumberToInvisibleChar;

export default {
	dmPermission: false,
	name: "Delete message",
	nameLocalizations: {
		fr: "Supprimer le message",
	},
	async execute(interaction: MessageContextMenuCommandInteraction): Promise<void> {
		const member = await interaction.guild?.members.fetch(interaction.user.id);
		const channel = (await interaction.guild?.channels.fetch(interaction.channelId)) as GuildTextBasedChannel;
		const message = await channel?.messages.fetch(interaction.targetId).catch(() => null);

		if(!message){
			interaction.reply({
				content: "Je ne peux pas lire ce salon ou je n'ai pas accès à ce message",
				ephemeral: true,
			});
			return;
		}

		let webhooks;
		if (channel.isThread()) {
			const thread = channel as ThreadChannel;
			const parent = thread.parent;
			webhooks = await parent?.fetchWebhooks();
		} else {
			webhooks = await channel.fetchWebhooks();
		}

		let myWebhook = webhooks?.find((w) => w.owner?.id === interaction.client.user?.id);

		const invisibleMessageAuthorId = message.content.split("\n").pop();

		if (!message || message.webhookId !== myWebhook?.id) {
			interaction.reply({
				content: "Je ne peux pas supprimer ce message",
				ephemeral: true,
			});
			return;
		} else if (
			member?.permissionsIn(channel).has("ManageMessages") ||
			invisibleMessageAuthorId === IdToInvisibleChars.translate(interaction.user.id)
		) {
			myWebhook.deleteMessage(message);
			interaction.reply({
				content: "Message supprimé",
				ephemeral: true,
			});
		} else {
			interaction.reply({
				content: "Vous n'avez pas la permission de supprimer ce message",
				ephemeral: true,
			});
		}
	},
	type: ApplicationCommandType.Message,
} as ApplicationCommandData;
