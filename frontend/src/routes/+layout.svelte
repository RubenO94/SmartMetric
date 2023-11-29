<script lang="ts">
	import '../app.css';
    import Sidebar from './components/Sidebar.svelte';
	import Header from './components/Header.svelte';

	let sidebarVisible = true
	
	function toggleSidebar() {
		sidebarVisible = !sidebarVisible
	}
</script>

<div class="flex">
	{#if sidebarVisible}
		<Sidebar />
	{/if}
	<div class="flex flex-col w-full">
		<Header {sidebarVisible} {toggleSidebar} />
		<slot />
	</div>
</div>