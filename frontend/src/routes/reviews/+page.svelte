<script lang="ts">
    import { goto } from "$app/navigation"
    import { LL } from "../../i18n/i18n-svelte"
    import { Plus, Search } from 'lucide-svelte'
    import { Indicator, Button } from "flowbite-svelte"

    export let data

    let reviews = data.reviews
    let activeSeparator: string = 'Active'

    function showStatusReview(reviewStatus: string) {
        switch(reviewStatus) {
            case 'Active': return $LL.ReviewState.Active()
            case 'NotStarted': return $LL.ReviewState.NotStarted()
            case 'Canceled': return $LL.ReviewState.Canceled()
            case 'Completed': return $LL.ReviewState.Completed()
            default: return $LL.ReviewState.DontExist()
        }
    }
</script>

<svelte:head>
    <title>{$LL.Sidebar.Reviews()}</title>
</svelte:head>

<div class="mx-auto flex flex-col w-[1280px] p-5 gap-y-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl">{ $LL.Sidebar.Reviews() }</h1>
        <a href="/reviews/createReview" class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svelte:component this={Plus} />
            { $LL.ReviewButton() }
        </a>
    </div>

    <!-- Search Bar -->
    <div class="flex">
        <input class="bg-gray-100 w-full p-4 rounded-l-lg text-sm border border-gray-200" type="search" placeholder="{$LL.ReviewSearchInput()}" />
        <button class="bg-blue-500 text-white py-2 px-4 rounded-r-lg border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svelte:component this={Search} />
        </button>
    </div>

    <!-- Table list of reviews -->
    <div class="flex flex-col">
        <div class="flex gap-x-2">
            <button on:click={() => activeSeparator = 'Active'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'Active' ? 'border-blue-500' : 'border-transparent'}">{$LL.Ongoing()}</button>
            <button on:click={() => activeSeparator = 'NotStarted'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'NotStarted' ? 'border-blue-500' : 'border-transparent'}">{$LL.NotStarted()}</button>
            <button on:click={() => activeSeparator = 'Canceled'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'Canceled' ? 'border-blue-500' : 'border-transparent'}">{$LL.Canceled()}</button>
            <button on:click={() => activeSeparator = 'Completed'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'Completed' ? 'border-blue-500' : 'border-transparent'}">{$LL.Completed()}</button>
        </div>
        <div class="w-full overflow-x-auto">
            <table class="w-full bg-transparent border-collapse table-auto">
                <thead>
                    <tr class="align-middle text-xs text-left whitespace-nowrap font-bold bg-gray-300 text-black">
                        <th class="py-3 px-2 w-1/2">{$LL.Sidebar.Reviews()}</th>
                        <th class="py-3 px-2">{$LL.State()}</th>
                        <th class="py-3 px-2">{$LL.EndingDate()}</th>
                        <th class="py-3 px-2">{$LL.Progression()}</th>
                        <th class="py-3 px-2 w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    {#each reviews as review}
                        {#if activeSeparator === review.reviewStatus}
                            <tr class="border-b border-gray-300 hover:bg-zinc-100 cursor-pointer" on:click={() => goto(`/reviews/${review.reviewId}`)}>
                                <td>
                                    <div class="flex flex-row p-2 gap-x-2">
                                        <div class="bg-red-200 flex items-center justify-center px-6 py-5 rounded-md">AA</div>
                                        <div class="flex flex-col">
                                            <p>{review.translations[0].title}</p>
                                            <p class="text-xs text-gray-400 overflow-hidden max-h-8 leading-4">{review.translations[0].description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p class="w-3/4 px-2 py-1 flex justify-center text-sm border border-transparent whitespace-nowrap rounded-lg {review.reviewStatus === 'Active' ? 'bg-green-500 text-white border-green-900' : 'bg-gray-200 text-black border-gray-400'}">
                                            {showStatusReview(review.reviewStatus)}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {#if review.endDate}
                                        <p>{(review.endDate).split('T')[0]}</p>
                                    {:else}
                                        <p>{$LL.StateDontExist()}</p>
                                    {/if}
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>