<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type ICard from "$lib/ICard";

	let card: ICard = $state({
		id: null,
		name: "",
		version: null,
		class: null,
		frameclass: null,
		value: null,
		type: "",
		body: "",
		rarity: "T",
		set: "FRB",
		setnumber: 1,
		art: "",
		artist: "",
		foil: "N",
		arttreatment: "N",
		printings: [],
	});

	async function createCard() {
		let result = await fetch("/api/cards", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(card),
		});
		if (result.ok) {
			let data = await result.json();
			card.id = data.id;
			let result2 = await fetch("/api/cards/" + data.id + "/printings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(card),
			});
			if (result2.ok) {
				// let data2 = await result2.json();
				// console.log(data2);
			} else {
				console.error("Error creating printing");
			}
		} else {
			console.error("Error creating card");
		}
	}
</script>

<div id="newCard">
	<div class="left">
		New card
		<br />
		<label for="name">Name</label>
		<input id="name" bind:value={card.name} />
		<br />
		<label for="version">Version</label>
		<select id="version" bind:value={card.version}>
			<option value={null}>None</option>
			<option value={1}>1</option>
			<option value={2}>2</option>
			<option value={3}>3</option>
		</select>
		<br />
		<label for="class">Class</label>
		<select id="class" bind:value={card.class}>
			<option value={null}>None</option>
			<option value="Gunslinger">Gunslinger</option>
			<option value="Pummeler">Pummeler</option>
			<option value="Engineer">Engineer</option>
			<option value="Manipulator">Manipulator</option>
			<option value="Duelist">Duelist</option>
			<option value="Tracker">Tracker</option>
			<option value="Evolution">Evolution</option>
			<option value="Capacitor">Capacitor</option>
		</select>
		<br />
		<label for="frameClass">Frame Class</label>
		<select id="class" bind:value={card.frameclass}>
			<option value={null}>None</option>
			<option value="Gunslinger">Gunslinger</option>
			<option value="Pummeler">Pummeler</option>
			<option value="Engineer">Engineer</option>
			<option value="Manipulator">Manipulator</option>
			<option value="Duelist">Duelist</option>
			<option value="Tracker">Tracker</option>
			<option value="Evolution">Evolution</option>
			<option value="Capacitor">Capacitor</option>
		</select>
		<br />
		<label for="value">Value</label>
		<input type="number" id="value" bind:value={card.value} />
		<br />
		<label for="type">Type</label>
		<input id="type" bind:value={card.type} />
		<br />
		<label for="body">Body</label>
		<textarea id="body" bind:value={card.body}></textarea>
		<br />
		<label for="selRarity">Rarity</label>
		<br />
		<select name="" id="selRarity" bind:value={card.rarity}>
			<option value="T">Token</option>
			<option value="C">Common</option>
			<option value="U">Uncommon</option>
			<option value="R">Rare</option>
			<option value="E">Epic</option>
			<option value="L">Legendary</option>
		</select>
		<br />
		<label for="selSet">Set</label>
		<br />
		<select name="" id="selSet" bind:value={card.set}>
			<option value="FRB">Fresh Blood</option>
			<option value="GMS">Grandmasters</option>
		</select>
		<br />
		<label for="txtSetNumber">Set Number</label>
		<br />
		<input type="text" id="txtSetNumber" bind:value={card.setnumber} />
		<br />
		<label for="txtArt">Art</label>
		<br />
		<input type="text" id="txtArt" bind:value={card.art} />
		<br />
		<label for="txtArtist">Artist</label>
		<br />
		<input type="text" id="txtArtist" bind:value={card.artist} />
		<br />
		<label for="selFoil">Foil</label>
		<br />
		<select name="" id="selFoil" bind:value={card.foil}>
			<option value="N">None</option>
			<option value="R">Rainbow</option>
			<option value="C">CRT</option>
		</select>
		<br />
		<label for="selArtTreatment">Art Treatment</label>
		<br />
		<select name="" id="selArtTreatment" bind:value={card.arttreatment}>
			<option value="N">None</option>
			<option value="F">Full Art</option>
		</select>
		<br /><br />
		<button class="btn" onclick={() => createCard()}>Create</button>
	</div>
	<div class="right">
		<Card {card} />
	</div>
</div>

<style>
	#newCard {
		padding-top: 80px;
		display: flex;
	}
	.left,
	.right {
		flex-grow: 1;
	}
	.right {
		zoom: 2;
	}
	@media print {
		.left {
			display: none;
		}
		.right {
			zoom: 1;
		}
	}
</style>
