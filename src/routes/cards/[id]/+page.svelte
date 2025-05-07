<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type ICard from "$lib/ICard";
	import { applyPrinting } from "$lib/utilities";

	let props = $props();
	let card = $state(props.data.card);
	let shownCard: ICard = $state(applyPrinting(card, card.printings[0]));
	let rightMode = $state("base");

	function selectPrinting(printing: any) {
		shownCard = applyPrinting(card, printing);
	}

	function createNewPrinting() {
		shownCard = { ...card };
		shownCard.art = "";
		shownCard.artist = "";
		shownCard.printings = [];
		rightMode = "newPrinting";
	}

	async function createPrinting() {
		let result = await fetch("/api/cards/" + shownCard.id + "/printings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(shownCard),
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
				<Card card={shownCard} />
			</div>
			<div class="center">
				<h2>Printings</h2>
				<div class="printings">
					{#each card.printings as printing}
						<div
							class="printing {shownCard.id === printing.id
								? 'active'
								: ''}"
							onclick={() => selectPrinting(printing)}
						>
							{printing.set}{printing.setnumber
								.toString()
								.padStart(3, "0")}
							<div class="grow"></div>
							Edit
						</div>
					{/each}
				</div>
				<br />
				<button class="btn" onclick={() => createNewPrinting()}
					>Create New Printing</button
				>
			</div>
			{#if rightMode === "base"}
				<div class="right">
					<h2>Official Rule Text</h2>
					{card.body}
					<br />
					<br />
					<button class="btn">Change Base Card Info</button>
				</div>
			{:else if rightMode === "newPrinting"}
				<div class="right">
					<h2>Create new printing</h2>
					<label for="txtBody">Body</label>
					<br />
					<textarea name="" id="txtBody" bind:value={shownCard.body}
					></textarea>
					<br />
					<label for="selRarity">Rarity</label>
					<br />
					<select
						name=""
						id="selRarity"
						bind:value={shownCard.rarity}
					>
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
					<select name="" id="selSet" bind:value={shownCard.set}>
						<option value="FRB">Fresh Blood</option>
						<option value="GMS">Grandmasters</option>
					</select>
					<br />
					<label for="txtSetNumber">Set Number</label>
					<br />
					<input
						type="text"
						id="txtSetNumber"
						bind:value={shownCard.setnumber}
					/>
					<br />
					<label for="txtArt">Art</label>
					<br />
					<input type="text" id="txtArt" bind:value={shownCard.art} />
					<br />
					<label for="txtArtist">Artist</label>
					<br />
					<input
						type="text"
						id="txtArtist"
						bind:value={shownCard.artist}
					/>
					<br />
					<label for="selFoil">Foil</label>
					<br />
					<select name="" id="selFoil" bind:value={shownCard.foil}>
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
						bind:value={shownCard.arttreatment}
					>
						<option value="N">None</option>
						<option value="F">Full Art</option>
					</select>
					<br /><br />
					<button class="btn" onclick={() => createPrinting()}
						>Create Printing</button
					>
				</div>
			{/if}
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
		gap: 1rem;
		.left,
		.center,
		.right {
			flex-grow: 1;
			flex-basis: 0;
		}
		.left {
			display: flex;
			justify-content: center;
		}
	}
	.printings .printing {
		background-color: #333;
		padding: 1rem;
		display: flex;
		&.active {
			border: 1px solid white;
		}
		.grow {
			flex-grow: 1;
		}
	}
</style>
