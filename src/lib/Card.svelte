<script lang="ts">
	import type ICard from "./ICard";

	export let card: ICard;

	function formatBody(body: string) {
		let lines = body.split("//");
		lines = lines.map((line) => {
			line = line.replace("/", "<br />");
			line = line.replace(/{C}/g, (_, p1) => "C");
			line = line.replace(/{MP}/g, (_, p1) => "MP");
			line = line.replace(/{HP}/g, (_, p1) => "HP");
			// Keyword
			line = line.replace(
				/{k:(.*?)}/g,
				(_, p1) => `<span class="keyword">${p1}</span>`,
			);
			// Flavour
			line = line.replace(
				/{f:(.*?)}/g,
				(_, p1) => `<span class="flavor">${p1}</span>`,
			);
			// Helper text
			line = line.replace(
				/{h:(.*?)}/g,
				(_, p1) => `<span class="helper">(${p1})</span>`,
			);
			// Trigger
			line = line.replace(
				/{t:(.*?)}/g,
				(_, p1) => `<span class="trigger">${p1}</span>`,
			);
			// Cost
			line = line.replace(
				/{\$:(.*?)}/g,
				(_, p1) => `<span class="cost">${p1}</span>`,
			);
			// Attack pattern
			line = line.replace(
				/{p:(.*?)}/g,
				(_, p1) => `<img src="/patterns/${p1}.svg" alt="${p1}" />`,
			);
			return line;
		});
		return lines;
	}

	function getClassFrame(
		className: string | null,
		frameClass: string | null,
	) {
		if (className === null && frameClass === null) {
			return "Generic";
		}
		return className ?? frameClass;
	}

	function getClassIcon(className: string | null) {
		if (className === null) {
			return "Generic";
		}
		return className;
	}
</script>

<div class="card" on:click>
	<div
		class="cardArt"
		style={card.art
			? `background: no-repeat center/100% url('/art/${card.art}')`
			: "background-color: white;"}
	></div>
	<div
		class="cardFrame"
		style="background: no-repeat center/cover url('/Neon - Frame {getClassFrame(
			card.class,
			card.frameclass,
		)}@2x.png')"
	></div>
	<div class="cardTitle">
		{card.name}
		{#if card.version}
			<span class="cardVersion v{card.version}">
				v{card.version}
			</span>
		{/if}
	</div>
	<div class="classIcon">
		<img src="/IMG_Icon-{getClassIcon(card.class)}@2x.png" alt="Generic" />
	</div>
	{#if card.body}
		<div class="body">
			<div class="float"></div>
			{#each formatBody(card.body) as line}
				<div class="line {line.indexOf('flavor') > -1 ? 'flavor' : ''}">
					{@html line}
				</div>
			{/each}
		</div>
	{/if}
	<div class="cardValue">{card.value ?? "―"}</div>
	<div class="cardType">{card.type}</div>
	<div class="cardInfo">
		<div class="rarity {card.rarity}">{card.rarity}</div>
		<div class="set">
			{card.set}{#if card.setnumber}{card.setnumber
					.toString()
					.padStart(3, "0")}{/if}
		</div>
		<div class="artist">{card.artist}</div>
		<div class="grow"></div>
		<div class="copyright">© Forge Alpha 2025</div>
	</div>
</div>

<style>
	.card {
		width: 63.5mm;
		height: 88.9mm;
		background-repeat: no-repeat;
		border-radius: 3mm;
		overflow: hidden;
		position: relative;
		font-size: 16px;
	}
	.cardArt,
	.cardFrame {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.cardArt {
		z-index: -2;
	}
	.cardTitle {
		color: white;
		font-weight: bold;
		position: absolute;
		top: 3.7mm;
		left: 4.2mm;
		font-size: 12px;
		text-transform: uppercase;
		text-shadow:
			-0.2mm 0 0.5mm #ff0000,
			0.2mm 0 0.5mm #0000ff;
		.cardVersion {
			text-transform: lowercase;
			font-style: italic;
			&.v1 {
				color: #ffaaaa;
			}
			&.v2 {
				color: #aaffaa;
			}
			&.v3 {
				color: #aaaaff;
			}
		}
	}
	.classIcon img {
		height: 16px;
		position: absolute;
		left: 54.8mm;
		top: 8.5mm;
		transform: translate(-50%, -50%);
	}
	.body {
		font-size: 12px;
		color: white;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding-bottom: 17mm;
		padding-left: 6.3mm;
		padding-right: 6.3mm;
		text-align: center;
		font-family: "Share Tech", sans-serif;
		--black-opacity: 0.75;
		background-color: rgba(0, 0, 0, var(--black-opacity));
		z-index: -1;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			background-color: red;
			height: 5mm;
			bottom: 100%;
			background: linear-gradient(
				to bottom,
				transparent 0%,
				rgba(0, 0, 0, var(--black-opacity)) 100%
			);
			z-index: -1;
		}
		.line + .line:not(.flavor) {
			margin-top: 0.5rem;
			position: relative;
			&::before {
				content: "";
				height: 0.14mm;
				width: 10rem;
				position: absolute;
				top: -1.1mm;
				left: 50%;
				transform: translateX(-50%);
				background-color: white;
			}
		}
		.line + .line.flavor {
			margin-top: 0.25rem;
		}
		:global(.keyword) {
			font-weight: bold;
			text-shadow:
				-0.2mm 0 0.5mm #ff0000,
				0.2mm 0 0.5mm #0000ff;
		}
		:global(.flavor) {
			font-size: 10px;
			font-style: italic;
			color: #b0b0b0;
			display: block;
			line-height: 1;
		}
		:global(.helper) {
			font-size: 10px;
			font-style: italic;
			color: #b0b0b0;
			display: block;
		}
		:global(.trigger) {
			border-top: 1px solid white;
			border-bottom: 1px solid white;
			border-left: 1px solid white;
			z-index: 1;
			border-top-left-radius: 16px;
			border-bottom-left-radius: 16px;
			padding-left: 4px;
			position: relative;
			margin-right: 8px;
			&::after {
				content: "";
				position: absolute;
				top: -1px;
				right: -15px;
				width: 15px;
				height: 15.5px;
				background-color: white;
				clip-path: polygon(
					0 0,
					7px 7.75px,
					0 15.5px,
					0 14.4px,
					5.9px 7.75px,
					0 1.1px
				);
			}
		}
		:global(.cost) {
			border-top: 1px solid white;
			border-bottom: 1px solid white;
			border-left: 1px solid white;
			position: relative;
			margin-right: 8px;
			padding-left: 2px;
			&::after {
				content: "";
				position: absolute;
				top: -1px;
				right: -15px;
				width: 15px;
				height: 15.5px;
				background-color: white;
				clip-path: polygon(
					0 0,
					7px 7.75px,
					0 15.5px,
					0 14.4px,
					5.9px 7.75px,
					0 1.1px
				);
			}
		}
		:global(img) {
			vertical-align: middle;
			width: 6px;
			position: relative;
			top: -1px;
		}
	}
	.cardValue {
		color: white;
		font-family: "Brandon Grotesque", sans-serif;
		position: absolute;
		font-weight: bold;
		left: 8.9mm;
		bottom: 6.4mm;
		transform: translate(-50%, -50%);
	}
	.cardType {
		color: white;
		font-weight: bold;
		position: absolute;
		bottom: 7.6mm;
		right: 4.2mm;
		font-size: 12px;
		text-transform: uppercase;
		text-shadow:
			-0.2mm 0 0.5mm #ff0000,
			0.2mm 0 0.5mm #0000ff;
	}
	.cardInfo {
		position: absolute;
		bottom: 2.6mm;
		left: 2.6mm;
		right: 2.6mm;
		font-size: 8px;
		font-family: "Share Tech", sans-serif;
		color: white;
		display: flex;
		align-items: center;
		.rarity {
			width: 10px;
			height: 10px;
			font-size: 7px;
			font-family: "Brandon Grotesque", sans-serif;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			margin-right: 1mm;
			&.T {
				background-color: #303030;
			}
			&.C {
				background-color: #666;
			}
			&.U {
				background-color: #33c;
			}
			&.R {
				background-color: #990;
			}
			&.E {
				background-color: #8a5fdb;
			}
		}
		.set {
			margin-right: 1mm;
		}
		.grow {
			flex-grow: 1;
		}
	}
</style>
