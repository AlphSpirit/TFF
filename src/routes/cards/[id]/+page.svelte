<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type ICard from "$lib/ICard";
	import { applyPrinting } from "$lib/utilities";

	let props = $props();
	let dataCard = props.data.card;
	let card: ICard = $state(applyPrinting(dataCard, dataCard.printings[0]));

	let newPrinting: ICard = $state({
		id: card.id,
		name: card.name,
		version: card.version,
		class: card.class,
		frameclass: card.frameclass,
		value: card.value,
		type: card.type,
		body: card.body,
		rarity: card.rarity || "T",
		set: card.set || "FRB",
		setnumber: card.setnumber,
		art: card.art || "",
		artist: card.artist || "",
		foil: card.foil,
		artTreatment: card.arttreatment,
		printings: [],
	});

	async function createPrinting() {
		let result = await fetch("/api/cards/" + card.id + "/printings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPrinting),
		});
		if (result.ok) {
			let data = await result.json();
			console.log(data);
		} else {
			console.error("Error creating printing");
		}
	}
</script>

<div id="card">
	<div class="container">
		<h1>Editing card</h1>
		<div class="columns">
			<div class="left">
				<Card card={newPrinting} />
			</div>
			<div class="center">
				<h2>Printings</h2>
				<div class="printings">
					{#each card.printings as printing}
						<div class="printing">
							{printing.set}{printing.setnumber
								.toString()
								.padStart(3, "0")}
						</div>
					{/each}
				</div>
			</div>
			<div class="right">
				<h2>Create new printing</h2>
				<label for="txtBody">Body</label>
				<br />
				<textarea name="" id="txtBody" bind:value={newPrinting.body}
				></textarea>
				<br />
				<label for="selRarity">Rarity</label>
				<br />
				<select name="" id="selRarity" bind:value={newPrinting.rarity}>
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
				<select name="" id="selSet" bind:value={newPrinting.set}>
					<option value="FRB">Fresh Blood</option>
					<option value="GMS">Grandmasters</option>
				</select>
				<br />
				<label for="txtSetNumber">Set Number</label>
				<br />
				<input
					type="text"
					id="txtSetNumber"
					bind:value={newPrinting.setnumber}
				/>
				<br />
				<label for="txtArt">Art</label>
				<br />
				<input type="text" id="txtArt" bind:value={newPrinting.art} />
				<br />
				<label for="txtArtist">Artist</label>
				<br />
				<input
					type="text"
					id="txtArtist"
					bind:value={newPrinting.artist}
				/>
				<br />
				<label for="selFoil">Foil</label>
				<br />
				<select name="" id="selFoil" bind:value={newPrinting.foil}>
					<option value="N">None</option>
					<option value="R">Rainbow</option>
					<option value="C">CRT</option>
				</select>
				<br />
				<label for="selArtTreatment">Art Treatment</label>
				<br />
				<select
					name=""
					id="selArtTreatment"
					bind:value={newPrinting.arttreatment}
				>
					<option value="N">None</option>
					<option value="F">Full Art</option>
				</select>
				<br /><br />
				<button class="btn" onclick={() => createPrinting()}
					>Create Printing</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	#card {
		padding-top: 80px;
		:global(.card) {
			zoom: 2;
		}
	}
	.columns {
		display: flex;
		.left,
		.center,
		.right {
			flex-grow: 1;
			flex-basis: 0;
		}
	}
</style>
