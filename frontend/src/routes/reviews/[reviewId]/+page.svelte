<script lang="ts">
    import { goto } from '$app/navigation'
    import { api } from '$lib/api/_api'
    import { DateInput } from 'date-picker-svelte'
    import { LL, locale } from '../../../i18n/i18n-svelte'
    import { onMount } from 'svelte'
    import PreviewForm from '$lib/components/PreviewForm.svelte'
    import Dropdown from '$lib/components/Dropdown.svelte'
    import { AlertTriangle, ArchiveX, Calendar, Clock, FileText } from 'lucide-svelte'
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
        review.createdDate = `${review.createdDate.slice(8, 10)}-${review.createdDate.slice(5, 7)}-${review.createdDate.slice(0, 4)}`
        if (review.reviewStatus == 'NotStarted') reviewPatchBody.reviewStatus = 'Active'
        else if (review.reviewStatus == 'Active') reviewPatchBody.reviewStatus = 'Canceled'
    })

    function checkPermission() {
        let window = user?.authorizations.find((m: any) => m.windowType === "Reviews")
        let permission = window.permissions.find((n: any) => n.permissionType === "Patch")
        return permission.hasPermission
    }

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
    console.log(review)
</script>

<Toaster />

<svelte:head>
    {#each review.translations as translation}
        {#if translation.language == lang}
            <title>{translation.title}</title>
        {:else}
            <title>{$LL.Review()}</title>
        {/if}
    {/each}
</svelte:head>

<header class="flex flex-row gap-x-4 items-center justify-center px-10 py-2 text-sm border-b-[1px] border-gray-300">
    <button on:click={() => pageSelected = 'details'} class="cursor-pointer font-semibold {pageSelected === 'details' ? 'underline' : 'hover:underline'}">{$LL.Details()}</button>
    <p> | </p>
    <button on:click={() => pageSelected = 'form'} class="cursor-pointer font-semibold {pageSelected === 'form' ? 'underline' : 'hover:underline'}">{$LL.Form()}</button>
</header>

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    {#if pageSelected == 'details'}
        <div class="flex flex-col">
            <div class=" border-x border-t border-gray-300 bg-gray-200 flex py-5 px-10 rounded-t-xl">
                <h1 class="font-semibold text-xl">{ review.translations[0].title }</h1>
            </div>
            <div class="flex justify-between border border-gray-300 py-5 px-10 rounded-b-xl">
                <div>
                    <p>«Progress bar»</p>
                </div>
                {#if review.reviewStatus == 'NotStarted' && checkPermission()}
                    <button on:click={showDialog} class="flex flex-row items-center gap-x-1 h-fit bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                        <svelte:component this={Clock} size="20" />
                        {$LL.StartReview()}
                    </button>

                    <!-- DIALOG -->
                    <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                        <div class="bg-white flex flex-col gap-y-5 rounded shadow-md p-8 mx-auto my-20 w-4/5 lg:w-3/5 xl:w-2/5">
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
                {:else if review.reviewStatus == 'Active' && checkPermission()}
                    <button on:click={showDialog} class="flex flex-row items-center gap-x-1 h-fit bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                        <svelte:component this={ArchiveX} size="20" />
                        {$LL.CancelReview()}
                    </button>

                    <!-- DIALOG -->
                    <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                        <div class="bg-white flex flex-col gap-y-5 rounded shadow-md p-8 mx-auto my-20 w-4/5 lg:w-3/5 xl:w-2/5">
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
        </div>
        <div class="flex flex-col md:flex-row justify-between gap-y-2">
            <div class="flex flex-col gap-y-2 w-1/2">
                <svelte:component this={FileText} size={50} class="text-blue-500" />
                <p class="font-semibold">{$LL.BasicInfo()}</p>
            </div>
            <div class="flex flex-col gap-y-5 p-2 md:py-10 md:px-20 border border-gray-300 bg-gray-200 rounded flex-grow">
                <div class="flex flex-col gap-y-1">
                    <p class="text-xs text-gray-400 font-medium">{$LL.Description()}</p>
                    <input class="text-base p-2 border-2 border-gray-300 bg-white text-gray-400 rounded" bind:value={review.translations[0].description} disabled />
                </div>
                <div class="flex flex-col gap-y-1">
                    <p class="text-xs text-gray-400 font-medium">{$LL.ReviewTypeTitle()}</p>
                    <input class="text-base p-2 border-2 border-gray-300 bg-white text-gray-400 rounded" bind:value={review.reviewType} disabled />
                </div>
                <div class="flex flex-col gap-y-1">
                    <p class="text-xs text-gray-400 font-medium">{$LL.CreationDate()}</p>
                    <input class="text-base p-2 border-2 border-gray-300 bg-white text-gray-400 rounded" bind:value={review.createdDate} disabled />
                </div>
            </div>
        </div>
        
        <!-- table of submissions -->
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