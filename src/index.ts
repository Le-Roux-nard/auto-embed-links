import { config } from "dotenv";
import discord, { ActivityType, Options } from "discord.js";
import { resolve } from "path";
import { EventLoader } from "./loaders/EventLoader";

config({ path: resolve(__dirname, `../.env`) });
let clientOptions: discord.ClientOptions = {
	intents: ["MessageContent", "Guilds", "GuildMessages", "GuildWebhooks"],
	allowedMentions: {
		parse: ["users", "roles"],
	},
	presence: {
		status: "idle",
		activities: [
			{
				name: "Boot Sequence",
				type: ActivityType.Watching,
			},
		],
	},
	makeCache: Options.cacheWithLimits({
		AutoModerationRuleManager: 0,
		ApplicationCommandManager: 0,
		BaseGuildEmojiManager: 0,
		GuildEmojiManager: 0,
		GuildMemberManager: 0,
		GuildBanManager: 0,
		GuildForumThreadManager: 0,
		GuildInviteManager: 0,
		GuildScheduledEventManager: 0,
		GuildStickerManager: 0,
		GuildTextThreadManager: 0,
		MessageManager: 0,
		PresenceManager: 0,
		ReactionManager: 0,
		ReactionUserManager: 0,
		StageInstanceManager: 0,
		ThreadManager: 0,
		ThreadMemberManager: 0,
		UserManager: 0,
		VoiceStateManager: 0,
	}),
};

export const client = new discord.Client(clientOptions);

EventLoader.loadEvents().then(() => {
	client.login(process.env.DISCORD_BOT_TOKEN);
});
