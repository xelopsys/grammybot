import dotenv from "dotenv";
dotenv.config();
import {
	Bot,
	InlineKeyboard,
	Context,
	session,
	SessionFlavor,
	Keyboard,
} from "grammy";
import { I18n, I18nFlavor } from "@grammyjs/i18n";
import { getAnswer, questionsKeyboardUZ } from "./utils/q&a";

const token = process.env.BOT_TOKEN as string;
type SessionData = {
	__language_code?: string;
};
export type TypeBot = Context & I18nFlavor & SessionFlavor<SessionData>;
const bot = new Bot<TypeBot>(token);

const i18n = new I18n<TypeBot>({
	defaultLocale: "en",
	directory: "dist/locales",
	useSession: true,
});

bot.use(
	session({
		initial: () => {
			return {};
		},
	})
);

bot.use(i18n);

const language_keyboard = new Keyboard()
	.text("UZB")
	.row()
	.text("RUS")
	.row()
	.text("ENG");

bot.command("start", async (ctx: TypeBot) => {
	// await ctx.reply(ctx.t("greeting"));
	await ctx.reply(ctx.t("greeting"), {
		reply_markup: { ...language_keyboard, one_time_keyboard: true },
	});
});

// bot.on("message", async (ctx) => {
// 	await ctx.i18n?.setLocale("fr");
// });

bot.hears(["RUS", "ENG"], async (ctx: TypeBot) => {
	await ctx.reply("Please select another language", {
		reply_markup: {
			...language_keyboard,
			one_time_keyboard: true,
			resize_keyboard: true,
		},
	});
});

bot.hears("UZB", async (ctx: TypeBot) => {
	await ctx.i18n?.setLocale("uz");
	await ctx.reply(ctx.t("after_greeting"), {
		reply_markup: {
			...questionsKeyboardUZ,
			one_time_keyboard: true,
			resize_keyboard: true,
		},
	});
});

bot.hears(["Sotib olish", "buy"], async (ctx: TypeBot) => {
	await ctx.reply(ctx.t("buy_word"), {
		reply_markup: {
			inline_keyboard: [
				[{ text: "Sotib olish", url: "https://t.me/Sugurtabozor_bot" }],
				[{ text: "Orqaga", callback_data: "back" }],
			],
			one_time_keyboard: true,
			resize_keyboard: true,
		},
	});
});

bot.hears(["Orqaga", "back"], async (ctx: TypeBot) => {
	await ctx.reply(ctx.t("back_to_greeting"), {
		reply_markup: {
			...questionsKeyboardUZ,
			one_time_keyboard: true,
			resize_keyboard: true,
		},
	});
});
bot.callbackQuery("back", async (ctx: TypeBot) => {
	await ctx.reply(ctx.t("back_to_greeting"), {
		reply_markup: {
			...questionsKeyboardUZ,
			one_time_keyboard: true,
			resize_keyboard: true,
		},
	});
});

bot.on("message:text", async (ctx: TypeBot) => await getAnswer(ctx));
// const inlineKeyboard = new InlineKeyboard().text("Click me", "c1").add({
// 	text: "Click me",
// 	callback_data: "c2",
// });
// bot.command("inline", (ctx) =>
// 	ctx.reply("Inline buttons", {
// 		reply_markup: { ...inlineKeyboard, one_time_keyboard: true },
// 	})
// );

// bot.callbackQuery("c1", (ctx) => {
// 	ctx.answerCallbackQuery("You clicked me!");
// 	ctx.reply("You clicked me!", {
// 		reply_markup: {
// 			remove_keyboard: true,
// 		},
// 	});
// });

// bot.on(["message:text", "message::phone_number"], async (ctx) => {
// 	const phoneKeyboard = {
// 		reply_markup: {
// 			keyboard: [
// 				[{ text: "Contact", request_contact: true }],
// 				[{ text: "Cancel" }],
// 			],
// 			one_time_keyboard: true,
// 		},
// 	};
// 	await ctx.reply("Please share your phone number", phoneKeyboard);
// 	if (await ctx.message?.contact?.phone_number) {
// 		await ctx.reply(`thank u ${ctx.message?.contact?.phone_number}`);
// 	}
// });
// bot.on("message", async (ctx) => {
// 	console.log(ctx.message.contact?.phone_number);
// });

// bot.on("message:p", async (ctx) => {})
// bot.on("message::phone_number", async (ctx) => {
// 	await ctx.reply(`thank u ${ctx.message?.contact?.phone_number}`);
// 	console.log("phone");
// });
// bot.on("message")

// bot.on("callback_query:data", (ctx) => {
// 	ctx.answerCallbackQuery("You clicked me!");
// });
bot.catch((error) => {
	console.log(error);
});
bot.start();
