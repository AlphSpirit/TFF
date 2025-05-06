<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type ICard from "$lib/ICard";

	let card: ICard = {
		name: "Amorce, la hors la loi",
		version: null,
		class: "Gunslinger",
		frameclass: "Gunslinger",
		value: 80,
		type: "Héro Flingueur",
		body: "Vos {k:Attaques} avec {k:Répétition} ont +1 {k:Dommage} sur leur dernière {k:Attaque}.//{f:L'un doit devenir le prédateur avant que les Catacombes ne fassent d'eux/ leur proie.}",
	};
</script>

<div id="hero">
	<div class="container">
		<div class="left">
			<div class="label">
				<img src="/IMG_Neon-Icon@2x.png" alt="" />
				Neon : Trading Card Game
			</div>
			<div class="title">Welcome<br />to Neon</div>
			<div class="subtitle">
				Neon is a brand new TCG started as a love letter to the Megaman
				Battle Network series and the synthwave aesthetic. Lorem ipsum
				dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
				minim veniam.
			</div>
			<button class="button"
				>Discover the Neon Phenomenon
				<img src="/IMG_Arrow-Go@2x.png" alt="" />
			</button>
		</div>
		<div class="leftArrow">
			<img src="/IMG_Arrow@2x.png" alt="" />
		</div>
		<div class="rightArrow">
			<img src="/IMG_Arrow@2x.png" alt="" />
		</div>
		<div class="pagination">
			<div class="page active"></div>
			<div class="page"></div>
			<div class="page"></div>
		</div>
	</div>
</div>

<style>
	#hero {
		background-image: url("/IMG_BG-Hero@2x.png");
		height: 75%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding-top: 80px;
		.container {
			height: 100%;
			position: relative;
		}
		.leftArrow, .rightArrow {
			position: absolute;
			top: 50%;
			cursor: pointer;
			img {
				height: 48px;
			}
		}
		.leftArrow {
			left: -64px;
		}
		.rightArrow {
			right: -64px;
			img {
				transform: scaleX(-1);
			}
		}
		.left {
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: start;
			flex-direction: column;
		}
		.label {
			color: #D900B6;
			margin-bottom: 8px;
			display: flex;
			align-items: center;
			img {
				height: 16px;
				margin-right: 8px;
			}
		}
		.title {
			color: white;
			font-size: 96px;
			text-shadow: 0 0 10px black;
			font-family: "Brandon Grotesque", sans-serif;
			font-weight: 900;
			text-transform: uppercase;
			line-height: 1;
			margin-bottom: 24px;
		}
		.subtitle {
			color: white;
			margin-bottom: 32px;
		}
		.button {
			padding: 16px 24px;
			font-family: "Share Tech", serif;
			font-size: 20px;
			border: 2px solid #3abeff;
			--center: #3abeff00;
			background: radial-gradient(transparent, #3abeff40);
			color: white;
			border-radius: 30px;
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: all 1s ease;
			gap: 8px;
			img {
				height: 16px;
			}
		}
		.pagination {
			position: absolute;
			bottom: 40px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			gap: 16px;
			.page {
				width: 16px;
				height: 16px;
				border-radius: 50%;
				border: 2px solid white;
				&.active {
					background-color: white;
				}
			}
		}
	}
</style>
