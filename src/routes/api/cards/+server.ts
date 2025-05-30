import sql from '$lib/DB.js';
import type ICard from '$lib/ICard.js';
import { orderCards } from '$lib/Utilities.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const cards: ICard[] = await sql`select * from cards`;
	const printings = await sql`select * from cards_printings`;
	for (const card of cards) {
		card.printings = printings.filter((printing) => printing.card_id === card.id);
		card.rarity = card.printings[0]?.rarity;
	}
	let orderedCards = orderCards(cards);
	return json(orderedCards);
}

export async function POST({ request }) {
	const body = await request.json();
	let result = await sql`insert into cards
	(name, version, class, frameClass, value, type, body)
	values
	(${body.name}, ${body.version}, ${body.class}, ${body.frameclass}, ${body.value}, ${body.type}, ${body.body})
	returning id`;
	return json({ id: result[0].id });
}