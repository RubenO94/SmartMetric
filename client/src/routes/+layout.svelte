<script context="module" lang="ts">
    import "../app.css"
    import Sidebar from '$lib/sidebar/Sidebar.svelte'
</script>

<Sidebar />
<main class="main-content">
    <slot />
</main>