import sql from '$lib/db';
import { json } from '@sveltejs/kit';

export async function PUT({ request, params }) {
	const body = await request.json();
	await sql`update cards_printings set
		rarity = ${body.rarity},
		body = ${body.body}
		where id = ${params.printing_id}`;
	return json({});
}