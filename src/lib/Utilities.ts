import type ICard from "./ICard";

export function orderCards(cards: ICard[]) {

	// Copy the array to avoid mutating the original
	cards = [...cards];

	// Sort by small rarity first
	const smallRarities = ["C", "U", "R"];
	cards = cards.sort((a, b) => {
		if (smallRarities.indexOf(b.rarity) === -1 && smallRarities.indexOf(a.rarity) === -1) {
			return 0;
		}
		if (a.rarity === b.rarity) {
			if (a.type.indexOf("Hero") !== -1 && b.type.indexOf("Hero") === -1) {
				return -1;
			}
			return 0;
		}
		return smallRarities.indexOf(b.rarity) < smallRarities.indexOf(a.rarity) ? -1 : 1;
	});

	// Sort by name
	cards = cards.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	// Sort by high rarity
	const highRarities = ["E", "L", "T"];
	cards = cards.sort((a, b) => {
		if (a.rarity === b.rarity) {
			if (a.type.indexOf("Hero") !== -1 && b.type.indexOf("Hero") === -1) {
				return -1;
			}
			return 0;
		}
		if (highRarities.indexOf(b.rarity) === -1 && highRarities.indexOf(a.rarity) === -1) {
			return 0;
		}
		if (a.rarity === b.rarity) {
			return 0;
		}
		return highRarities.indexOf(b.rarity) < highRarities.indexOf(a.rarity) ? -1 : 1;
	});

	// Sort by class
	const classes = [null, "Pummeler", "Gunslinger", "Manipulator", "Engineer", "Duelist", "Tracker", "Capacitor", "Evolution"];
	cards = cards.sort((a, b) => {
		const aClass = a.frameclass;
		const bClass = b.frameclass;
		if (aClass === bClass) {
			return 0;
		}
		return classes.indexOf(aClass) < classes.indexOf(bClass) ? -1 : 1;
	});

	return cards;

}

export function applyPrinting(card: ICard, printing: any) {

	// Copy the card to avoid mutating the original
	card = { ...card };

	// Check if the printing is null
	if (!printing) {
		return card;
	}

	// Apply the card to the printing
	printing.name = card.name;
	printing.version = card.version;
	printing.class = card.class;
	printing.frameclass = card.frameclass;
	printing.value = card.value;
	printing.type = card.type;
	printing.printings = card.printings;

	// Return the updated card
	return printing;

}