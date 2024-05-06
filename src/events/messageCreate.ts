import { ChannelType, Client, GuildTextBasedChannel, Message, ThreadChannel, WebhookMessageCreateOptions } from "discord.js";
import NumberToInvisibleChar from "../utils/NumberToInvisibleChar.js";
import allMatchers from "../classes/regexs/index.js";

const IdToInvisibleChars = NumberToInvisibleChar;
// const URL_REGEX =
// 	/https?:\/\/(?:www\.)?(?<domain>(twitter|x)\.com|(?:vm\.)?tiktok\.com)\/(?:(?<=(?:twitter|x)\.com\/)(.+?\/status\/\d+)|(?<=vm\.tiktok\.com\/)(.+?\b\/)|(?<=tiktok\.com\/)(@[A-Za-z_0-9]+\/video\/\d+))/gim;

export default async (client: Client, message: Message) => {
	if (!message.channel || message.channel.type === ChannelType.DM || !!message.webhookId) return;
	let content = message.content;

	const channel = (await client.channels.fetch(message.channel.id)) as Exclude<GuildTextBasedChannel, ThreadChannel>;
	const member = await message.guild!.members.fetch(message.author.id);
	if (!channel || !member) return;

	for (const matcher of allMatchers) {
		content = matcher.exec(content);
	}

	if (message.content === content) return;

	content += `\n${IdToInvisibleChars.translate(message.author.id)}`;

	let webhooks;
	if (channel.isThread()) {
		const thread = channel as ThreadChannel;
		const parent = thread.parent;
		webhooks = await parent?.fetchWebhooks();
	} else {
		webhooks = await channel.fetchWebhooks();
	}

	let myWebhook = webhooks?.find((w) => w.owner?.id === client.user?.id);

	if (!myWebhook) {
		myWebhook = await (message.channel.isThread() ? message.channel.parent : message.channel)?.createWebhook({
			name: "Auto Embed Webhook",
		});
	}

	const webhookOptions: WebhookMessageCreateOptions = {
		username: member.displayName,
		avatarURL: member.displayAvatarURL(),
		content,
		allowedMentions: {
			users: [message.author.id],
		},
	};

	if (message.channel.isThread()) {
		webhookOptions.threadId = channel.id;
	}

	const webhookMessage = await myWebhook?.send(webhookOptions);
	try {
		message.delete();
	} catch {
		webhookMessage?.delete();
	}
};
