<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type ICard from "$lib/ICard";
	import { applyPrinting } from "$lib/Utilities";

	let props = $props();
	let cards: ICard[] = props.data.cards;
	let toPrint: ICard[] = $state([]);
	let filter = $state("");

	function filteredCards() {
		return cards.filter(
			(c) => c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1,
		);
	}

	function addToPrint(card: ICard) {
		toPrint.push(card);
	}

	function removeFromPrint(card: ICard) {
		let index = toPrint.indexOf(card);
		if (index > -1) {
			toPrint.splice(index, 1);
		}
	}
</script>

<div id="print">
	<div class="container">
		<div class="left">
			<input type="text" bind:value={filter} />
			<div class="cardList">
				{#each filteredCards() as card}
					<Card
						on:click={() => addToPrint(applyPrinting(card, card.printings[0]))}
						card={applyPrinting(card, card.printings[0])}
					/>
				{/each}
			</div>
		</div>
		<div class="right">
			<h2>Cards to Print</h2>
			<div class="printList">
				{#each toPrint as card}
					<Card on:click={() => removeFromPrint(card)} card={card} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	#print {
		padding-top: 80px;
	}
	.container {
		display: flex;
	}
	.cardList {
		display: grid;
		grid-template-columns: auto auto auto;
		:global(.card) {
			zoom: 0.5;
			&:hover {
				zoom: 1;
			}
		}
	}
	.printList {
		display: flex;
		flex-wrap: wrap;
	}
	@media print {
		.left {
			display: none;
		}
		h2 {
			display: none;
		}
		#print {
			padding-top: 0;
		}
		:global(.card) {
			filter: brightness(1.1) contrast(1.1) saturate(1.2) opacity(0.8);
		}
		/* :global(.card):nth-child(2) {
			filter: brightness(1.1)
		}
		:global(.card):nth-child(3) {
			filter: brightness(1.2);
		}
		:global(.card):nth-child(4) {
			filter: brightness(1.3);
		}
		:global(.card):nth-child(5) {
			filter: brightness(1.4);
		}
		:global(.card):nth-child(6) {
			filter: brightness(1.5);
		}
		:global(.card):nth-child(7) {
			filter: brightness(1.6);
		}
		:global(.card):nth-child(8) {
			filter: brightness(1.7);
		}
		:global(.card):nth-child(9) {
			filter: brightness(1.8);
		} */
	}
</style>
