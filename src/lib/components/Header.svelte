<script lang="ts">
	import { LL } from '../../i18n/i18n-svelte'
	import { page } from '$app/stores'
	import { PanelLeftClose, PanelLeftOpen, ChevronRight, HelpCircle, AlignJustifyIcon } from 'lucide-svelte'

	export let sidebarVisible: boolean
	export let toggleSidebar: () => void

	$: directories = $page.url.pathname.split('/').filter(Boolean)
	
</script>

<header class="flex items-center px-2 md:px-5 py-2 text-xs md:text-sm border-b-[1px] border-gray-300 justify-between">
	<!-- Button to hide or show the Sidebar -->
	<div class="flex gap-x-1 md:gap-x-4">
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
			<button on:click={toggleSidebar} class="text-gray-700 p-1 rounded border-2 border-transparent hover:bg-gray-300">
				<svelte:component this={AlignJustifyIcon} />		  
			</button>
		</div>
	
		<!-- Directories -->
		<div class="hidden md:flex flex-row gap-x-1 items-center">
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
		<div class="md:hidden flex flex-row gap-x-1 items-center py-2">
			{#each directories as directory, index}
				{#if index + 1 == directories.length}
					<a href="/" class="text-gray-400 hover:underline">{$LL.YourWork()}</a>
					<svelte:component this={ChevronRight} size={15} class="text-gray-400" />
					<a href="/{directories.slice(0, index + 1).join('/')}" class="font-medium hover:underline">{directory.charAt(0).toUpperCase() + directory.slice(1)}</a>
				{/if}
			{/each}
		</div>
	</div>

	<!-- <div class="flex gap-x-2 items-center">
		<div class="relative group">
			<svelte:component this={HelpCircle} class="cursor-pointer" />
			<div class="absolute w-max top-0 right-full mt-2 mr-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
				{$LL.Help()}
			</div>
		</div>
	</div> -->
		  
</header>