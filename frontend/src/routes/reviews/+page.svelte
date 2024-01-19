<script lang="ts">
    import { goto } from "$app/navigation"
    import { LL } from "../../i18n/i18n-svelte"
    import { Plus, Search, AlertCircle } from 'lucide-svelte'
    import { Input } from "flowbite-svelte"
    import ProgressBar from "$lib/components/ProgressBar.svelte";

    export let data

    let reviews = data.reviews
    let user = data.user
    let activeSeparator: string = 'Active'
    let searchInput = ''

    function showStatusReview(reviewStatus: string) {
        switch(reviewStatus) {
            case 'Active': return $LL.ReviewState.Active()
            case 'NotStarted': return $LL.ReviewState.NotStarted()
            case 'Canceled': return $LL.ReviewState.Canceled()
            case 'Completed': return $LL.ReviewState.Completed()
            default: return $LL.ReviewState.DontExist()
        }
    }

    function checkPermission() {
        let window = user?.authorizations.find((m: any) => m.windowType == 'Reviews')
        let permission = window.permissions.find((n: any) => n.permissionType === 'Create')
        return permission.hasPermission
    }

    $: hasActiveReview = reviews.some((review: any) => review.reviewStatus === activeSeparator) 
    $: filteredItems = reviews.filter((element: any) => element.translations.some((r: any) => r.title.toLowerCase().includes(searchInput.toLowerCase())))
</script>

<svelte:head>
    <title>{$LL.Sidebar.Reviews()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    <div class="flex flex-col md:flex-row gap-y-5 justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Sidebar.Reviews() }</h1>
        {#if checkPermission()}
            <a href="/reviews/createReview" class="flex items-center gap-x-1 bg-blue-500 text-white font-semibold mx-auto md:mx-0 py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                <svelte:component this={Plus} />
                { $LL.ReviewButton() }
            </a>
        {/if}
    </div>

    <!-- Search Bar -->
    <div class="flex relative">
        <input bind:value={searchInput} type="text" class="bg-gray-100 w-full pl-12 pr-5 py-4 rounded-lg text-sm border border-gray-200" placeholder="{$LL.ReviewSearchInput()}" /> 
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
            <Search />
        </div>
    </div>

    <!-- Table list of reviews -->
    <div class="flex flex-col">
        <div class="flex gap-x-2 overflow-x-auto whitespace-nowrap">
            <button on:click={() => activeSeparator = 'Active'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'Active' ? 'border-blue-500 text-blue-500' : 'border-transparent'}">{$LL.Ongoing()}</button>
            <button on:click={() => activeSeparator = 'NotStarted'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'NotStarted' ? 'border-blue-500 text-blue-500' : 'border-transparent'}">{$LL.NotStarted()}</button>
            <button on:click={() => activeSeparator = 'Canceled'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'Canceled' ? 'border-blue-500 text-blue-500' : 'border-transparent'}">{$LL.Canceled()}</button>
            <button on:click={() => activeSeparator = 'Completed'} class="p-2 border-b-2 cursor-pointer hover:border-blue-500 {activeSeparator === 'Completed' ? 'border-blue-500 text-blue-500' : 'border-transparent'}">{$LL.Completed()}</button>
        </div>
        <div class="w-full overflow-x-auto">
            {#if filteredItems.length > 0 && hasActiveReview}
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
                    {#each filteredItems as review}
                        {#if activeSeparator === review.reviewStatus}
                            <tr class="border-b border-gray-300 hover:bg-zinc-100 cursor-pointer" on:click={() => goto(`/reviews/${review.reviewId}`)}>
                                <td>
                                    <div class="flex flex-row p-2 gap-x-2">
                                        <div class="bg-red-200 flex items-center justify-center w-[60px] h-[60px] rounded-md">{review.translations[0].title.slice(0, 3)}</div>
                                        <div class="flex flex-col">
                                            <p>{review.translations[0].title}</p>
                                            <p class="text-xs text-gray-400 overflow-hidden max-h-8 leading-4">{review.translations[0].description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p class="mx-5 px-2 py-1 flex justify-center text-sm border border-transparent whitespace-nowrap rounded-lg {review.reviewStatus === 'Active' ? 'bg-green-500 text-white border-green-900' : 'bg-gray-200 text-black border-gray-400'}">
                                            {showStatusReview(review.reviewStatus)}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex px-5 text-sm md:text-base">
                                        {#if review.endDate}
                                            <p>{(review.endDate).split('T')[0]}</p>
                                        {:else}
                                            <p>{$LL.StateDontExist()}</p>
                                        {/if}
                                    </div>
                                </td>
                                <td>
                                    {#if review.reviewStatus == 'Active'}
                                        <ProgressBar bind:submissions={review.submissions} reviewIdPage={false} />
                                    {/if}
                                </td>
                                <td></td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        {:else}
            <div class="flex justify-center items-center rounded">
                <div class="flex flex-col items-center text-gray-400 p-5 gap-y-2">
                    <svelte:component this={AlertCircle} size={50} />
                    <p>{$LL.ReviewDivText()}</p>
                </div>
            </div>
        {/if}
        </div>
    </div>
</div>