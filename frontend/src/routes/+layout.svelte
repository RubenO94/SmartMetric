<script lang="ts">
	import '../app.css'
	import LL from '../i18n/i18n-svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
	import Header from '$lib/components/Header.svelte'
	import { fly } from 'svelte/transition'
	import { Clipboard, List, BarChartBig } from 'lucide-svelte'

	export let data

	let user = data.user
	let sidebarVisible = false
	
	function toggleSidebar() { sidebarVisible = !sidebarVisible }
</script>

<div class="flex w-full min-h-screen overflow-y-hidden">
	{#if sidebarVisible}
		<Sidebar bind:user={user} />
	{/if}
	<div class="flex flex-col flex-1">
		{#if sidebarVisible}
		<div class="2xl:hidden fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen">
			<div class="2xl:hidden absolute w-[300px] p-2 min-h-full border-r border-gray-300 bg-gray-100" transition:fly={{ delay: 0, duration: 100, x: -50 }}>
				<button on:click={toggleSidebar} class="absolute right-2 p-1 hover:bg-gray-300 hover:text-red-500 rounded">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
				<p class="font-semibold text-center pt-10 pb-1 px-2">{$LL.Backoffice()}</p>
        		<hr class="mx-10 py-1" />
				<nav class="flex flex-col gap-y-1">
					<a href="/reviews" class="flex gap-x-2 items-center p-2 text-sm hover:bg-gray-300 rounded" on:click={() => sidebarVisible = false}>
						<svelte:component this={Clipboard} size={15} />
						{$LL.Sidebar.Reviews()}
					</a>
					<a href="/forms" class="flex gap-x-2 items-center p-2 text-sm hover:bg-gray-300 rounded" on:click={() => sidebarVisible = false}>
						<svelte:component this={List} size={15} />
						{$LL.Sidebar.Forms()}
					</a>
					<a href="/statistics" class="flex gap-x-2 items-center p-2 text-sm hover:bg-gray-300 rounded" on:click={() => sidebarVisible = false}>
						<svelte:component this={BarChartBig} size={15} />
						{$LL.Sidebar.Statistics()}
					</a>
				</nav>
			</div>
		</div>
		{/if}
		<Header {sidebarVisible} {toggleSidebar} />
		<div style="max-height: calc(100vh - 56px); overflow-y: auto;">
			<slot />
		</div>
	</div>
</div>