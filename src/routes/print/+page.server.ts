export const load = async ({ fetch }) => {
	let cards = await fetch("/api/cards");
	cards = await cards.json();
	return { cards };
}