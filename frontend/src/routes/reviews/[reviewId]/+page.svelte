<script lang="ts">
    import { goto } from '$app/navigation';
    import { api } from '$lib/api/_api';
    import { LL, locale } from '../../../i18n/i18n-svelte'

    export let data

    let lang = $locale.toUpperCase()
    let review = data.review
    let pageSelected = 'details'
    let reviewPatchBody = {
        endDate: '',
        reviewStatus: 'Active',
    }

    function showDialog() {
        let dialog = document.getElementById('dialog');
        dialog?.classList.remove('hidden');
    }

    function hideDialog() {
        let dialog = document.getElementById('dialog');
        setTimeout(() => {
            dialog?.classList.add('hidden');
        }, 100);
    }

    async function startReview() {
        const [request] = await Promise.all([
            api("PATCH", `Reviews/${review.reviewId}`, reviewPatchBody)
        ])

        const response = request
        goto('/reviews')
    }
</script>

<svelte:head>
    {#each review.translations as translation}
        {#if translation.language == lang}
            <title>{translation.title}</title>
        {:else}
            <title>Review</title>
        {/if}
    {/each}
</svelte:head>

<header class="flex flex-row gap-x-4 items-center justify-center px-10 py-2 text-sm border-b-[1px] border-gray-300">
    <a href="/reviews/{review.reviewId}?page=details" on:click={() => pageSelected = 'details'} class="cursor-pointer font-semibold {pageSelected === 'details' ? 'underline' : 'hover:underline'}">{$LL.Details()}</a>
    <p> | </p>
    <a href="/reviews/{review.reviewId}?page=form" on:click={() => pageSelected = 'form'} class="cursor-pointer font-semibold {pageSelected === 'form' ? 'underline' : 'hover:underline'}">{$LL.Form()}</a>
</header>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    {#if pageSelected == 'details'}
        <div class="flex justify-between">
            <h1 class="font-semibold text-xl">{ review.translations[0].title }</h1>
            {#if review.reviewStatus == 'NotStarted'}
                <button on:click={showDialog} class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path fill="currentColor" d="M7 3H17V7.2L12 12L7 7.2V3Z"><animate id="eosIconsHourglass0" fill="freeze" attributeName="opacity" begin="0;eosIconsHourglass1.end" dur="2s" from="1" to="0"/></path><path fill="currentColor" d="M17 21H7V16.8L12 12L17 16.8V21Z"><animate fill="freeze" attributeName="opacity" begin="0;eosIconsHourglass1.end" dur="2s" from="0" to="1"/></path><path fill="currentColor" d="M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z"/><animateTransform id="eosIconsHourglass1" attributeName="transform" attributeType="XML" begin="eosIconsHourglass0.end" dur="0.5s" from="0 12 12" to="180 12 12" type="rotate"/></g></svg>
                    {$LL.StartReview()}
                </button>

                <!-- DIALOG -->
                <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5 flex flex-col gap-y-5">
                        <div class="flex items-center gap-5">
                            <div class="bg-blue-200 text-blue-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>                                     
                                </p>                                                                               
                            </div>
                            <div>
                                <h1 class="font-bold text-xl mb-2">{$LL.ChangeReviewStatusDialog()}</h1>
                                <p class="text-gray-400 text-sm">{$LL.ChangeReviewStatusDialogDesc()}</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <p>{$LL.AddEndDate()}</p>
                            <input type="date" class="bg-gray-100 px-2 py-1 text-base font-mono cursor-pointer text-gray-600 rounded-lg" bind:value={reviewPatchBody.endDate} />
                        </div>
                        <div class="flex justify-end gap-4 mt-5">
                            <button class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200" on:click="{hideDialog}">{$LL.Cancel()}</button>
                            <button class="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-700" on:click="{startReview}">{$LL.Start()}</button>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {:else if pageSelected == 'form'}
        <p>Form</p>
    {/if}
</div>