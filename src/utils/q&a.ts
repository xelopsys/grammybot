import { Context, Keyboard } from "grammy";
import { TypeBot } from "../index";

export const questionsKeyboardUZ = new Keyboard()
	.text("Qanday qillib sug'urta sotib olaman?")
	.row()
	.text("GAI ni planshetida sug'urta ko'rinadimi?")
	.row()
	.text("Haydovchi qanday qo'shiladi?")
	.row()
	.text("Menga polis kelmadi")
	.row()
	.text("Firmaning mashinasini sug'urtalab bilamanmi?")
	.row()
	.text("Toshkent uchun faqat VIP sug'urta mavjudmi?")
	.row()
	.text("VIP sug'urtada qarindoshlarni qo'shish shartmi?")
	.row()
	.text("Sug'urta polisini qayerdan olaman?");

export const questionsUZ = [
	"Qanday qillib sug'urta sotib olaman?",
	"GAI ni planshetida sug'urta ko'rinadimi?",
	"Haydovchi qanday qo'shiladi?",
	"Menga polis kelmadi",
	"Firmaning mashinasini sug'urtalab bilamanmi?",
	"Toshkent uchun faqat VIP sug'urta mavjudmi?",
	"VIP sug'urtada qarindoshlarni qo'shish shartmi?",
	"Sug'urta polisini qayerdan olaman?",
];

const answersUZ = [
	`Sotib olish uchun pastda joylashgan tugmani bosasiz. 

	1. Telegram botga o'tib, o'z telefon raqamingizni kiriting
	2. Rasmiylashtirishga o'tish tugmasini bosing
	3. Mashina davlat raqamini va texnik pasport seriya raqamini kiriting
	4. Kerak bo'lsa haydovchi qo'shing
	5. Payme/click orqali to'ling
	6. Tandirdan issiq polis sizga yuboriladi`,
	`Sug'urta Bozordan sotib olingan polislar GAI (DAN) xodimlari planshetlarida ko'rinadi.

	Sotib olingan polisning qog'oz variantini olib yurish shart emas.`,
	`Mashina davlat raqamini va texnik pasport seriya raqamini kiritgandan so'ng haydovchilar qo'shish imkoniyati paydo bo'ladi`,
	`Texnik sabablarga ko'ra sizga SMS tarzida polis kelmagan bo'lishi mumkin. 

	Buning 3 ta sababi bor:
	
	1. Agar sizning ma'lumotingiz ba'zada topilmagan bo'lsa, sizga 3700 raqamidan 2 soat ichida polis tekshirilishi haqida ma'lumot keladi. Agar 2 soat ichida polis sizga yuborilmasa, pulingiz avtomatik tarzda qaytariladi
	2. Siz 3700 raqamidan kelgan SMSni ko'rmagan bo'lishingiz yoki ushbu nomer sizda "blok"da turgan bo'lishi mumkin
	3. SMS kelishi uchun ba'zida 10 daqiqa kerak bo'ladi. Shuning yana biroz kutishga harakat qilib ko'ring`,
	`Albatta. Yuridik shaxsga tegishli mashinani ham bizning platforma yormida sug'urtalasa bo'ladi`,
	`Ha, hozirgi kunda plaformamiz orqali Toshkent shahar va Toshkent viloyati uchun`,
	`Agar mashinangizda qarindoshlikni tasdiqlaydigan hujjat bo'lsa qarindoshlarni sug'urta polisiga qo'shish shart emas. Agar quyida hujjat bo'lmasa qarindoshlarni qo'shish kerak, chunki qarindoshlar mashinani ishonchnomasiz haydaydilar. Shu sababli DAN hodimlari, mashina egasiga qarindoshlik darajani sug'urta polisiga qarab yoki hujjatga qarab anglab oladilar`,
	`Platformamiz orqali xarid amalga oshirganingizdan keyin sizga 3700 raqamidan havola yuboriladi. Shu havola orqali o'tib, sug'urta polisini yuklab olishingiz mumkin`,
];

export async function getAnswer(ctx: TypeBot) {
	const message = ctx.message?.text;
	if (message) {
		if ((await ctx.i18n.getLocale()) === "uz") {
			const index = questionsUZ.findIndex(
				(q) => q.toLowerCase() === message.toLowerCase()
			);
			if (index !== -1) {
				await ctx.reply(answersUZ[index], {
					reply_markup: {
						keyboard: [[{ text: "Orqaga" }], [{ text: "Sotib olish" }]],
						one_time_keyboard: true,
						resize_keyboard: true,
					},
				});
			}
		} else {
			await ctx.reply(ctx.t("choose_another_language"));
		}
		// 	if(ctx.from?.language_code === "uz"){
		// 	const index = questionsUZ.findIndex(
		// 		(q) => q.toLowerCase() === message.toLowerCase()
		// 	);
		// 	if (index !== -1) {
		// 		await ctx.reply(answersUZ[index], {
		// 			reply_markup: {},
		// 		});
		// 	}
		// }
	}
}
