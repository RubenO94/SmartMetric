<script lang="ts">
    import { LL, locale } from "../../i18n/i18n-svelte"

    export let data

    let reviews = data.reviews
    let activeSeparator: number = 0
    //$: console.log(activeSeparator)
    console.log(reviews)
</script>

<svelte:head>
    <title>{$LL.Sidebar.Reviews()}</title>
</svelte:head>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl">{ $LL.Sidebar.Reviews() }</h1>
        <a href="/reviews/createReview" class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            { $LL.ReviewButton() }
        </a>
    </div>

    <!-- Search Bar -->
    <div class="flex">
        <input class="bg-gray-100 w-full p-4 rounded-l-lg text-sm border border-gray-200" type="search" placeholder="{$LL.ReviewSearchInput()}" />
        <button class="bg-blue-500 text-white py-2 px-4 rounded-r-lg border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </button>
    </div>

    <!-- Table list of reviews -->
    <div class="flex flex-col">
        <div class="flex gap-x-2">
            <button on:click={() => activeSeparator = 0} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator == 0 ? 'border-blue-500' : 'border-transparent'}">{$LL.Ongoing()}</button>
            <button on:click={() => activeSeparator = 1} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator == 1 ? 'border-blue-500' : 'border-transparent'}">{$LL.Completed()}</button>
            <button on:click={() => activeSeparator = 2} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator == 2 ? 'border-blue-500' : 'border-transparent'}">{$LL.NotStarted()}</button>
            <button on:click={() => activeSeparator = 3} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator == 3 ? 'border-blue-500' : 'border-transparent'}">{$LL.Canceled()}</button>
        </div>
        <div class="block w-full overflow-x-auto">
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
                        <tr class="border-b border-gray-300">
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
                                    <p class="w-3/4 px-2 py-1 flex justify-center text-sm border border-transparent cursor-pointer rounded-lg {review.reviewStatus === 'Active' ? 'bg-green-500 text-white hover:bg-green-700 hover:border-green-900' : 'bg-gray-200 text-black hover:bg-gray-300 hover:border-gray-500'}">
                                        {review.reviewStatus}
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
                            <td>
                                <div class="bg-green-200 w-full h-5 rounded-full"><div class="bg-green-500 w-3/5 h-5 rounded-full"></div></div>
                            </td>
                            <td class="align-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>