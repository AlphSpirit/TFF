export default interface ICard {
	id: number | null;
	name: string;
	version: number | null;
	class: string | null;
	frameclass: string | null;
	value: number | null;
	type: string;
	body: string | null;
	rarity: string | null;
	set: string | null;
	setnumber: number | null;
	art: string | null;
	artist: string | null;
	foil: string | null;
	arttreatment: string | null;
	printings: any[];
}