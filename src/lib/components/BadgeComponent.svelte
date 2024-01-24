<script lang="ts">
    import { Dot } from 'lucide-svelte'
    export let reviewStatus: string
</script>

<div class="flex items-center pr-2 border border-gray-400 bg-gray-300 rounded-xl">
    <Dot class="{reviewStatus === 'Active' ? 'text-green-500' : 'text-red-500'}" />
    <p class="text-xs">{reviewStatus}</p>
</div>