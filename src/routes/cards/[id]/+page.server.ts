export const load = async ({ fetch, params }) => {
	let card = await fetch(`/api/cards/${params.id}`);
	card = await card.json();
	return { card };
}