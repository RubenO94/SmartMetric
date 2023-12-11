<script lang="ts">
    import ChooseReview from "$lib/components/ChooseReview.svelte"
    import CreateBlankReview from "$lib/components/CreateBlankReview.svelte"
    import LL from "../../../i18n/i18n-svelte"
    
    let currentStep: number = 1
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-5">
    {#if currentStep == 1}
        <ChooseReview bind:currentStep={currentStep} />
    {:else}
        <div class="flex flex-row gap-x-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" height="100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div class="flex flex-col gap-y-2">
                <h1 class="font-semibold text-xl">{ $LL.CreateBlankReview() }</h1>
                <p class="text-black text-sm">{ $LL.CreateBlankReviewDescription() }</p>
            </div>
        </div>
        <CreateBlankReview />
    {/if}
</div>