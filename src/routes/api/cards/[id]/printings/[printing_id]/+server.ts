import sql from '$lib/DB';
import { json } from '@sveltejs/kit';

export async function PUT({ request, params }) {
	const body = await request.json();
	await sql`update cards_printings set
		body = ${body.body},
		rarity = ${body.rarity},
		set = ${body.set},
		setnumber = ${body.setnumber},
		art = ${body.art},
		artist = ${body.artist},
		foil = ${body.foil},
		artTreatment = ${body.arttreatment}
		where id = ${params.printing_id}`;
	return json({});
}