import sql from '$lib/DB';

export async function POST({ request }) {
	const body = await request.json();
	await sql`insert into cards_printings
	(card_id, body, rarity, set, setnumber, art, artist, foil, artTreatment)
	values
	(${body.id}, ${body.body}, ${body.rarity}, ${body.set}, ${body.setnumber}, ${body.art}, ${body.artist}, ${body.foil}, ${body.arttreatment})`;
	return new Response(null, { status: 200 });
}