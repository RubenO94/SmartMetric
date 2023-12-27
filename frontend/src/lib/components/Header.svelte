<script lang="ts">
	import { LL } from '../../i18n/i18n-svelte'
	import { page } from '$app/stores'

	export let sidebarVisible: boolean
	export let toggleSidebar: () => void

	const arrowIcon = `
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	`

	// Function to generate html for each directory with arrowIcon
	function generatePathHTML(path: string) {
    	const directories = path.split('/').filter(Boolean); // Remove empty strings
    	return directories.map((directory, index) => {
			const lastElement = index === directories.length - 1
			const linkClass = lastElement ? 'font-semibold hover:underline' : 'text-gray-400 hover:underline'
      		return `
        		<a href="/${directories.slice(0, index + 1).join('/')}" class="${linkClass}">
        			${directory.charAt(0).toUpperCase() + directory.slice(1)}
        		</a>
        		${index < directories.length - 1 ? `<span>${arrowIcon}</span>` : ''}
      		`;
    	}).join('');
  	}
	
</script>

<header class="flex items-center px-10 py-2 text-sm border-b-[1px] border-gray-300 justify-between">
	<!-- Button to hide or show the Sidebar -->
	<div class="flex gap-x-4">
		<div class="relative 2xl:inline-block group hidden">
			<button on:click={toggleSidebar} class="text-gray-700 p-1 rounded border-2 border-transparent hover:bg-gray-300 active:border-blue-500">
				{#if sidebarVisible}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18m7-6l-3-3l3-3"/></g></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18m5-12l3 3l-3 3"/></g></svg>
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
		<div class="2xl:hidden group">
			<button on:click={toggleSidebar} class="text-gray-700 p-1 rounded border-2 border-transparent hover:bg-gray-300 active:border-blue-500">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>				  
			</button>
			<div class="absolute w-max top-0 left-full mt-2 ml-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
				{$LL.ShowMenu()}
			</div>
		</div>
	
		<!-- Directories -->
		<div class="flex flex-row gap-x-1 items-center py-2">
			<a href="/" class="text-gray-400 hover:underline">{$LL.YourWork()}</a>
			{@html arrowIcon}
			{@html generatePathHTML($page.url.pathname)}
		</div>
	</div>

	<div class="relative inline-block group">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6 cursor-pointer">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
		</svg>
		<div class="absolute w-max top-0 right-full mt-2 mr-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
			{$LL.Help()}
		</div>
	</div>
		  
</header>