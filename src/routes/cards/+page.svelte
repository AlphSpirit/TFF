<script lang="ts">
	import { goto } from "$app/navigation";
	import Card from "$lib/Card.svelte";
	import { applyPrinting } from "$lib/utilities";

	let props = $props();
	let cards = props.data.cards;
</script>

<div id="cards">
	<div class="container">
		<a href="/cards/new">New card</a>
		<div class="cards">
			{#each cards as card}
				<Card
					on:click={() => goto(`/cards/${card.id}`)}
					card={applyPrinting(card, card.printings[0])}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	#cards {
		padding-top: 80px;
		:global(.card) {
			cursor: pointer;
		}
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1rem;
	}
</style>
