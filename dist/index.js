"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const grammy_1 = require("grammy");
const i18n_1 = require("@grammyjs/i18n");
const q_a_1 = require("./utils/q&a");
const token = process.env.BOT_TOKEN;
const bot = new grammy_1.Bot(token);
const i18n = new i18n_1.I18n({
    defaultLocale: "en",
    directory: "dist/locales",
    useSession: true,
});
bot.use((0, grammy_1.session)({
    initial: () => {
        return {};
    },
}));
bot.use(i18n);
const language_keyboard = new grammy_1.Keyboard()
    .text("UZB")
    .row()
    .text("RUS")
    .row()
    .text("ENG");
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // await ctx.reply(ctx.t("greeting"));
    yield ctx.reply(ctx.t("greeting"), {
        reply_markup: Object.assign(Object.assign({}, language_keyboard), { one_time_keyboard: true }),
    });
}));
// bot.on("message", async (ctx) => {
// 	await ctx.i18n?.setLocale("fr");
// });
bot.hears(["RUS", "ENG"], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Please select another language", {
        reply_markup: Object.assign(Object.assign({}, language_keyboard), { one_time_keyboard: true, resize_keyboard: true }),
    });
}));
bot.hears("UZB", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield ((_a = ctx.i18n) === null || _a === void 0 ? void 0 : _a.setLocale("uz"));
    yield ctx.reply(ctx.t("after_greeting"), {
        reply_markup: Object.assign(Object.assign({}, q_a_1.questionsKeyboardUZ), { one_time_keyboard: true, resize_keyboard: true }),
    });
}));
bot.hears(["Sotib olish", "buy"], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(`${ctx.t("buy_word")}
		https://t.me/Sugurtabozor_bot
	`, {
        reply_markup: {
            keyboard: [[{ text: "Orqaga" }]],
            one_time_keyboard: true,
            resize_keyboard: true,
        },
    });
}));
bot.hears(["Orqaga", "back"], (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(ctx.t("back_to_greeting"), {
        reply_markup: Object.assign(Object.assign({}, q_a_1.questionsKeyboardUZ), { one_time_keyboard: true, resize_keyboard: true }),
    });
}));
bot.callbackQuery("back", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(ctx.t("back_to_greeting"), {
        reply_markup: Object.assign(Object.assign({}, q_a_1.questionsKeyboardUZ), { one_time_keyboard: true, resize_keyboard: true }),
    });
}));
bot.on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, q_a_1.getAnswer)(ctx); }));
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
