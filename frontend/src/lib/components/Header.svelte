<script lang="ts">
	import { LL } from '../../i18n/i18n-svelte'
	import { page } from '$app/stores'
	import { PanelLeftClose, PanelLeftOpen, ChevronRight, HelpCircle } from 'lucide-svelte'

	export let sidebarVisible: boolean
	export let toggleSidebar: () => void

	$: directories = $page.url.pathname.split('/').filter(Boolean)
	
</script>

<header class="flex items-center px-10 py-2 text-sm border-b-[1px] border-gray-300 justify-between">
	<!-- Button to hide or show the Sidebar -->
	<div class="flex gap-x-4">
		<div class="relative 2xl:inline-block group hidden">
			<button on:click={toggleSidebar} class="text-gray-700 p-1 rounded border-2 border-transparent hover:bg-gray-300 active:border-blue-500">
				{#if sidebarVisible}
					<svelte:component this={PanelLeftClose} />
				{:else}
					<svelte:component this={PanelLeftOpen} />
				{/if}
			</button>
			<div class="absolute w-max top-0 left-full mt-2 ml-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
				{#if sidebarVisible}
					{$LL.HideSidebar()}
				{:else}
					{$LL.ShowSidebar()}
				{/if}
			</div>
		</div>
		<div class="2xl:hidden relative group">
			{#if sidebarVisible == false}
				<button on:click={toggleSidebar} class="text-gray-700 p-1 rounded border-2 border-transparent hover:bg-gray-300">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>			  
				</button>
			{/if}
		</div>
	
		<!-- Directories -->
		<div class="flex flex-row gap-x-1 items-center py-2">
			<a href="/" class="text-gray-400 hover:underline">{$LL.YourWork()}</a>
			{#each directories as directory, index}
				<svelte:component this={ChevronRight} size={15} class="text-gray-400" />
				{#if index + 1 != directories.length}
					<a href="/{directories.slice(0, index + 1).join('/')}" class="text-gray-400 hover:underline">{directory.charAt(0).toUpperCase() + directory.slice(1)}</a>
				{:else}
					<a href="/{directories.slice(0, index + 1).join('/')}" class="font-medium hover:underline">{directory.charAt(0).toUpperCase() + directory.slice(1)}</a>
				{/if}
			{/each}
		</div>
	</div>

	<div class="relative inline-block group">
		<svelte:component this={HelpCircle} class="cursor-pointer" />
		<div class="absolute w-max top-0 right-full mt-2 mr-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
			{$LL.Help()}
		</div>
	</div>
		  
</header>