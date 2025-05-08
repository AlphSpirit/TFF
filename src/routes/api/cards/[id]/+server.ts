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

export async function PUT({ request, params }) {
	const body = await request.json();
	await sql`update cards set
		name = ${body.name},
		version = ${body.version},
		class = ${body.class},
		frameclass = ${body.frameclass},
		value = ${body.value},
		type = ${body.type},
		body = ${body.body}
		where id = ${params.id}`;
	return json({});
}

export async function DELETE({ params }) {
	let result = await sql`delete from cards where id = ${params.id}`;
	return json({});
}