<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type ICard from "$lib/ICard";
	import { applyPrinting } from "$lib/Utilities";

	let props = $props();
	let card = props.data.card;
	let shownCard: ICard = $state(applyPrinting(card, card.printings[0]));
	let rightMode = $state("base");

	function selectPrinting(printing: any) {
		shownCard = applyPrinting(card, printing);
		rightMode = "base";
	}

	function createNewPrinting() {
		shownCard = { ...card };
		shownCard.id = shownCard.card_id;
		shownCard.art = "";
		shownCard.artist = "";
		shownCard.printings = [];
		shownCard.setnumber = 1;
		rightMode = "newPrinting";
	}

	function editPrinting(printing: any) {
		shownCard = applyPrinting(card, printing);
		shownCard.printings = [];
		rightMode = "editPrinting";
		console.log(shownCard);
	}

	function back() {
		shownCard = applyPrinting(card, card.printings[0]);
		rightMode = "base";
	}

	function editBase() {
		shownCard = { ...card };
		shownCard.printings = [];
		rightMode = "editBase";
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

	async function savePrinting() {
		let result = await fetch(
			"/api/cards/" + shownCard.card_id + "/printings/" + shownCard.id,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(shownCard),
			},
		);
		if (result.ok) {
			let data = await result.json();
			console.log(data);
		} else {
			console.error("Error creating printing");
		}
	}

	async function deleteCard() {
		let answer = confirm("Do you really want to delete " + card.name + "?");
		if (!answer) {
			return;
		}
		let result = await fetch("/api/cards/" + card.id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (result.ok) {
			let data = await result.json();
			console.log(data);
		} else {
			console.error("Error creating printing");
		}
	}

	async function saveBaseCard() {
		let result = await fetch("/api/cards/" + shownCard.id, {
			method: "PUT",
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

	// async function editPrinting() {
	// 	// let result = await fetch("/api/cards/" + shownCard.id + "/printings/", {
	// 	// 	method: "POST",
	// 	// 	headers: {
	// 	// 		"Content-Type": "application/json",
	// 	// 	},
	// 	// 	body: JSON.stringify(shownCard),
	// 	// });
	// 	// if (result.ok) {
	// 	// 	let data = await result.json();
	// 	// 	console.log(data);
	// 	// } else {
	// 	// 	console.error("Error creating printing");
	// 	// }
	// }
</script>

<div id="card">
	<div class="container">
		<h1>Editing card</h1>
		<div class="columns">
			<div class="left">
				<Card card={shownCard} />
				<button class="btn" onclick={() => deleteCard()}
					>Delete Card</button
				>
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
							<span
								onclick={(e) => {
									e.stopPropagation();
									editPrinting(printing);
								}}>Edit</span
							>
						</div>
					{/each}
				</div>
				<br />
				<button class="btn" onclick={() => createNewPrinting()}
					>Create New Printing</button
				>
			</div>
			<div class="right">
				{#if rightMode === "base"}
					<h2>Official Rule Text</h2>
					{card.body}
					<br />
					<br />
					<button class="btn" onclick={() => editBase()}
						>Change Base Card Info</button
					>
				{:else if rightMode === "newPrinting" || rightMode === "editPrinting"}
					{#if rightMode === "newPrinting"}
						<h2>Create new printing</h2>
					{:else if rightMode === "editPrinting"}
						<h2>Edit printing</h2>
					{/if}
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
					{#if rightMode === "newPrinting"}
						<button class="btn" onclick={() => createPrinting()}
							>Create Printing</button
						>
					{:else if rightMode === "editPrinting"}
						<button class="btn" onclick={() => savePrinting()}
							>Save Printing</button
						>
					{/if}
				{:else if rightMode === "editBase"}
					<h2>Editing base info</h2>
					<label for="txtName">Name</label>
					<br />
					<input
						type="text"
						id="txtName"
						bind:value={shownCard.name}
					/>
					<br />
					<label for="version">Version</label>
					<select id="version" bind:value={shownCard.version}>
						<option value={null}>None</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
					</select>
					<br />
					<label for="class">Class</label>
					<select id="class" bind:value={shownCard.class}>
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
					<select id="class" bind:value={shownCard.frameclass}>
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
					<input
						type="number"
						id="value"
						bind:value={shownCard.value}
					/>
					<br />
					<label for="type">Type</label>
					<input id="type" bind:value={shownCard.type} />
					<br />
					<label for="body">Body</label>
					<textarea id="body" bind:value={shownCard.body}></textarea>
					<br />
					<br />
					<button class="btn" onclick={() => saveBaseCard()}
						>Save base info</button
					>
				{/if}
				{#if rightMode !== "base"}
					<button class="btn" onclick={() => back()}>Back</button>
				{/if}
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
		gap: 1rem;
		.left,
		.center,
		.right {
			flex-grow: 1;
			flex-basis: 0;
		}
		.left {
			display: flex;
			flex-direction: column;
			align-items: center;
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
