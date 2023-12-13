<script lang="ts">
    import LL from "../../i18n/i18n-svelte"

    export let currentStep: number
</script>

<div class="flex flex-row justify-center">
    <h1 class="font-semibold text-xl">{$LL.NewReviewTitle()}</h1>
</div>
<div class="flex justify-center gap-x-2 mt-10 text-blue-500">
    <button on:click={() => currentStep = 2} class="flex flex-row w-[400px] h-[200px] border border-gray-300 p-10 rounded hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1/3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <div class="flex flex-col w-2/3 gap-y-2 mt-4">
            <p class="font-semibold text-start">{$LL.CreateBlankReview()}</p>
            <p class="text-gray-400 text-xs text-start">{$LL.CreateBlankReviewDescription()}</p>
        </div>
    </button>
    <button on:click={() => currentStep = 3} class="flex flex-row w-[400px] h-[200px] border border-gray-300 p-10 rounded hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-1/3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <div class="flex flex-col w-2/3 gap-y-2 mt-4">
            <p class="font-semibold text-start">{$LL.CopyFormModel()}</p>
            <p class="text-gray-400 text-xs text-start">{$LL.CopyFormModelDescription()}</p>
        </div>
    </button>
</div>