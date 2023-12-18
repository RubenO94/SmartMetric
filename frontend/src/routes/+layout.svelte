<script lang="ts">
	import '../app.css';
    import Sidebar from '$lib/components/Sidebar.svelte'
	import Header from '$lib/components/Header.svelte'

	let sidebarVisible = false
	
	function toggleSidebar() {
		sidebarVisible = !sidebarVisible
	}
</script>

<div class="flex w-full min-h-screen overflow-y-hidden">
	{#if sidebarVisible}
		<Sidebar />
	{/if}
	<div class="flex flex-col flex-1">
		<Header {sidebarVisible} {toggleSidebar} />
		<div style="max-height: calc(100vh - 56px); overflow-y: auto;">
			<slot />
		</div>
	</div>
</div>