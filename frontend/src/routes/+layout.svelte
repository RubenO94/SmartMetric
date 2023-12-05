<script lang="ts">
	import '../app.css';
    import Sidebar from '$lib/components/Sidebar.svelte'
	import Header from '$lib/components/Header.svelte'

	let sidebarVisible = true
	
	function toggleSidebar() {
		sidebarVisible = !sidebarVisible
	}
</script>

<div class="flex h-screen w-full">
	{#if sidebarVisible}
		<Sidebar />
	{/if}
	<div class="flex flex-col w-full">
		<Header {sidebarVisible} {toggleSidebar} />
		<slot />
	</div>
</div>