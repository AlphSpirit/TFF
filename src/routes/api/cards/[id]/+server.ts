import sql from '$lib/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	let result = await sql`select * from cards where id = ${params.id}`;
	if (result.length === 0) {
		return error(404);
	}
	let result2 = await sql`select * from cards_printings where card_id = ${params.id}`;
	result[0].printings = result2 || [];
	return json(result[0]);
}