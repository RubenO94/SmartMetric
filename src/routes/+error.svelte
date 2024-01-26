<script>
	import { page } from '$app/stores';
	import { AlertOctagon } from 'lucide-svelte';
</script>

<div class="w-full h-full flex flex-col gap-y-5 justify-center items-center">
	<AlertOctagon class="w-10 h-10" />
	<h1>{$page.error?.message}</h1>
</div>
