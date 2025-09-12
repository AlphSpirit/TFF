<script lang="ts">
	import { page } from "$app/state";

	function isLinkActive(link: string): boolean {
		// return page.url.pathname === link;
		return false;
	}
</script>

<div id="header">
	<div class="container">
		<a class="logo" href="/">
			<img src="/IMG_Neon-Logo.svg" alt="NEON" height="40" />
		</a>
		<div class="grow"></div>
		<a class="link {isLinkActive('/') ? 'active' : ''}" href="/">Home</a>
		<a class="link {isLinkActive('/news') ? 'active' : ''}" href="/news"
			>News</a
		>
		<a class="link {isLinkActive('/lore') ? 'active' : ''}" href="/lore"
			>Lore</a
		>
		<a class="link {isLinkActive('/heroes') ? 'active' : ''}" href="/heroes"
			>Heroes</a
		>
		<a class="link {isLinkActive('/learn') ? 'active' : ''}" href="/learn"
			>How to play</a
		>
		<a class="link {isLinkActive('/cards') ? 'active' : ''}" href="/cards"
			>Cards</a
		>
		<a class="link {isLinkActive('/about') ? 'active' : ''}" href="/about"
			>About</a
		>
		<button class="btn">Login</button>
	</div>
</div>

<style>
	#header {
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		backdrop-filter: blur(25px);
		z-index: 1;
		.container {
			height: 5rem;
			display: flex;
			align-items: center;
		}
		.logo {
			display: flex;
			align-items: center;
			margin-right: 20px;
			cursor: pointer;
		}
		.grow {
			flex-grow: 1;
		}
		.link {
			padding: 0 20px;
			height: 100%;
			display: flex;
			align-items: center;
			text-decoration: none;
			color: white;
			position: relative;
			&::after {
				content: "";
				position: absolute;
				width: calc(100% - 40px);
				height: 4px;
				bottom: 20px;
				border-radius: 1px;
				background-image: linear-gradient(97deg, #d900b6, #3abeff);
				opacity: 0;
				transition: opacity 0.2s ease;
			}
			&.active::after {
				opacity: 1;
			}
			&:hover:after {
				opacity: 1;
			}
		}
		button {
			margin-left: 20px;
		}
	}
	@media print {
		#header {
			display: none;
		}
	}
</style>
