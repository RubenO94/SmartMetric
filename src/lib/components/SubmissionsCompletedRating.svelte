<script lang="ts">
    import LL from "../../i18n/i18n-svelte"

    export let submissions: any

    let percentage = 0
</script>

<div class="flex flex-col items-center gap-y-[10px]">
    {#if submissions.length > 0}
        <p class="font-semibold">Avaliação geral: </p>
        <div class="flex flex-col gap-y-0">
            <div class="border border-gray-300 bg-gray-200 w-80 h-5 overflow-hidden rounded-full">
                <div class="bg-blue-500 h-full flex items-center" style="width: {percentage}%;">
                    <p class="px-5 font-semibold {percentage > 15 ? 'text-white' : 'text-black'}">{percentage}%</p>
                </div>
            </div>
        </div>
    {:else}
        <p>Sem dados para mostrar avaliação</p>
    {/if}
</div>