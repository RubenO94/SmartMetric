<script lang="ts">
    import { goto } from '$app/navigation'
    import { api } from '$lib/api/_api'
    import { DateInput } from 'date-picker-svelte'
    import { LL, locale } from '../../../i18n/i18n-svelte'
    import { onMount } from 'svelte'
    import PreviewForm from '$lib/components/PreviewForm.svelte'
    import Dropdown from '$lib/components/Dropdown.svelte'
    import { AlertTriangle, ArchiveX, Calendar, Clock } from 'lucide-svelte'
    import toast, { Toaster } from 'svelte-french-toast';

    export let data

    let user = data.user
    let lang = $locale.toUpperCase()
    let review = data.review
    let activeLang = review.translations[0].language
    let pageSelected = 'details'
    let reviewPatchBody = {
        endDate: undefined,
        reviewStatus: '',
    }
    let maxDateAllowed = new Date()
    maxDateAllowed.setFullYear(maxDateAllowed.getFullYear() + 5)

    onMount(() => {
        if (review.reviewStatus == 'NotStarted') reviewPatchBody.reviewStatus = 'Active'
        else if (review.reviewStatus == 'Active') reviewPatchBody.reviewStatus = 'Canceled'
    })

    function showLanguageTranslation(languageAbbrev: string) {
        switch (languageAbbrev) {
            case 'PT':
                return $LL.Portuguese()
            case 'EN':
                return $LL.English()
            case 'ES':
                return $LL.Spanish()
            case 'FR':
                return $LL.French()
            case 'PL':
                return $LL.Polish()
            default:
                return 'This language doesn`t exist'
        }
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

    async function patchReview() {
        const [request] = await Promise.all([
            api("PATCH", `Reviews/${review.reviewId}`, reviewPatchBody)
        ])

        if (request?.error) {
            hideDialog()
            toast.error($LL.PatchReviewStatusError())
        } else {
            toast.success($LL.PatchReviewStatus())
            goto('/reviews')
        }        
    }
</script>

<Toaster />

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

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    {#if pageSelected == 'details'}
        <div class="flex justify-between">
            <h1 class="font-semibold text-xl mb-5">{ review.translations[0].title }</h1>
            {#if review.reviewStatus == 'NotStarted'}
                <button on:click={showDialog} class="flex flex-row items-center gap-x-1 h-fit bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                    <svelte:component this={Clock} size="20" />
                    {$LL.StartReview()}
                </button>

                <!-- DIALOG -->
                <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5 flex flex-col gap-y-5">
                        <div class="flex items-center gap-5">
                            <div class="bg-blue-200 text-blue-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                <p>
                                    <svelte:component this={Calendar} />                                   
                                </p>                                                                               
                            </div>
                            <div>
                                <h1 class="font-bold text-xl mb-2">{$LL.ChangeReviewStatusDialog()}</h1>
                                <p class="text-gray-400 text-sm">{$LL.ChangeReviewStatusDialogDesc()}</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <p>{$LL.AddEndDate()}</p>
                            <DateInput bind:value={reviewPatchBody.endDate} placeholder="" closeOnSelection max={maxDateAllowed} />
                        </div>
                        <div class="flex justify-end gap-4 mt-5">
                            <button class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200" on:click="{hideDialog}">{$LL.Cancel()}</button>
                            <button class="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-700" on:click="{patchReview}">{$LL.Start()}</button>
                        </div>
                    </div>
                </div>
            {:else if review.reviewStatus == 'Active'}
                <button on:click={showDialog} class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                    <svelte:component this={ArchiveX} size="20" />                                       
                    {$LL.CancelReview()}
                </button>

                <!-- DIALOG -->
                <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5 flex flex-col gap-y-5">
                        <div class="flex items-center gap-5">
                            <div class="bg-red-200 text-red-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                <p>
                                    <svelte:component this={AlertTriangle} />                           
                                </p>                                                                               
                            </div>
                            <div>
                                <h1 class="font-bold text-xl mb-2">{$LL.ChangeReviewStatusDialog2()}</h1>
                                <p class="text-gray-400 text-sm">{$LL.ChangeReviewStatusDialogDesc2()}</p>
                            </div>
                        </div>
                        <div class="flex justify-end gap-4 mt-5">
                            <button class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200" on:click="{hideDialog}">{$LL.GoBack()}</button>
                            <button class="bg-red-500 px-6 py-2 rounded text-white hover:bg-red-700" on:click="{patchReview}">{$LL.CancelReview()}</button>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <p class="text-sm text-gray-400">{review.translations[0].description}</p>
        <!-- Track of the progress of review -->
    {:else if pageSelected == 'form'}
        <div class="flex justify-between">
            <p class="font-semibold text-xl">{$LL.Form()}</p>
            <div class="flex gap-x-2 items-center">
                {#if review.reviewStatus == 'NotStarted'}
                    <Dropdown bind:object={review} {user} />
                {/if}
                <select bind:value={activeLang} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1 rounded-lg">
                    {#each review.translations as translation}
                        <option value={translation.language}>{$LL.ShowFormIn()} {showLanguageTranslation(translation.language)}</option>
                    {/each}
                </select>
            </div>
        </div>
        <PreviewForm bind:object={review} bind:lang={activeLang} />
    {/if}
</div>

<style>
    :root {
        --date-input-width: 100%
    }
</style>