<script lang="ts">
	import '../app.css'
	import LL from '../i18n/i18n-svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
	import Header from '$lib/components/Header.svelte'

	export let data

	let user = data.user
	let sidebarVisible = false
	
	function toggleSidebar() {
		sidebarVisible = !sidebarVisible
	}
</script>

<div class="flex w-full min-h-screen overflow-y-hidden">
	{#if sidebarVisible}
		<Sidebar bind:user={user} />
	{/if}
	<div class="flex flex-col flex-1">
		{#if sidebarVisible}
			<div class="2xl:hidden absolute w-60 p-1 min-h-full border-r border-gray-300 bg-gray-100">
				<button on:click={toggleSidebar} class="absolute right-2 p-1 bg-gray-300 hover:text-red-500 rounded">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
				<p class="font-semibold text-center pt-10 pb-1 px-2">{$LL.Backoffice()}</p>
        		<hr class="mx-10 py-1" />
				<nav class="flex flex-col gap-y-1">
					<a href="/reviews" class="flex gap-x-2 items-center p-2 text-sm hover:bg-gray-300 rounded" on:click={() => sidebarVisible = false}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
						</svg>
						{$LL.Sidebar.Reviews()}
					</a>
					<a href="/forms" class="flex gap-x-2 items-center p-2 text-sm hover:bg-gray-300 rounded" on:click={() => sidebarVisible = false}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
						</svg>
						{$LL.Sidebar.Forms()}
					</a>
					<a href="/statistics" class="flex gap-x-2 items-center p-2 text-sm hover:bg-gray-300 rounded" on:click={() => sidebarVisible = false}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
						</svg>
						{$LL.Sidebar.Statistics()}
					</a>
				</nav>
			</div>
		{/if}
		<Header {sidebarVisible} {toggleSidebar} />
		<div style="max-height: calc(100vh - 56px); overflow-y: auto;">
			<slot />
		</div>
	</div>
</div>