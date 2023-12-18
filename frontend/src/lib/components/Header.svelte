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

<header class="flex flex-row gap-x-4 items-center px-10 py-2 text-sm border-b-[1px] border-gray-300">
	<!-- Button to hide or show the Sidebar -->
	<div class="relative inline-block group">
		<button on:click={toggleSidebar} class="text-gray-700 p-1 rounded border-2 border-transparent hover:bg-gray-300 active:border-blue-500">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
			</svg>
		</button>
		<div class="absolute w-max top-0 left-full mt-2 ml-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
			{#if sidebarVisible}
				{$LL.HideSidebar()}
			{:else}
				{$LL.ShowSidebar()}
			{/if}
		</div>
	</div>

	<!-- Directories -->
	<div class="flex flex-row gap-x-1 items-center">
		<a href="/reviews" class="text-gray-400 hover:underline">{$LL.YourWork()}</a>
		{@html arrowIcon}
		{@html generatePathHTML($page.url.pathname)}
	</div>
</header>