<script lang="ts">
    import { api } from "$lib/api/_api"
    import { onMount } from "svelte"
    import LL from "../../i18n/i18n-svelte"
    import { AlertCircle } from "lucide-svelte"

    let page = 1
    let reviews: Reviews[] = []
    let reviewChoosed: Reviews
    let submissions: any[] = []

    onMount(async () => {
        const [reviewsResponse] = await Promise.all([api("GET", `Reviews`)])
        reviews = reviewsResponse?.body
        reviews = reviews.filter((review: any) => review.reviewStatus === 'Completed')
    })

    async function loadSubmissions() {
        page += 1
        const [submissionsResponse] = await Promise.all([api("GET", `Reviews/Submissions?reviewId=${reviewChoosed.reviewId}`)])
        submissions = submissionsResponse?.body
        console.log(submissions)
    }
</script>

<svelte:head>
    <title>{$LL.Sidebar.Statistics()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Sidebar.Statistics() }</h1>
    </div>

    {#if reviews.length > 0 && page == 1}
        <div class="flex flex-col gap-y-4">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">Selecionar review</p>
                <p class="text-xs text-gray-400">Escolha de entre as revisões completas, a que deseja apresentar dados.</p>
            </div>
            <select bind:value={reviewChoosed} class="py-2 px-4 border border-gray-300 bg-gray-100 rounded-lg">
                {#each reviews as review}
                    <option value="{review}">{review.translations[0].title}</option>
                {/each}
            </select>
            <button on:click={() => loadSubmissions()} class="p-1 border border-transparent text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-900 rounded-lg">Submit</button>
        </div>
    {:else if reviews.length > 0 && page == 2}
        <div class="flex gap-x-5">
            <div class="flex flex-col w-2/5 border border-black rounded">
                <div class="flex flex-col w-4/5">
                    <div class="bg-black text-white h-10 flex justify-center items-center">
                        <p>Average</p>
                    </div>
                    
                    {#each reviewChoosed.questions as question}
                        {#if question.responseType === 'Rating'}
                            <div class="border border-black min-h-[50px]">
                                <div class="bg-gray-200 px-1">
                                    <p class="font-medium text-sm">{question.position} - {question.translations[0].title} </p>
                                </div>
                                <p class="text-xs text-gray-400 px-1">{question.translations[0].description}</p>
                            </div>
                        {/if}
                    {/each}

                    <div class="bg-black text-white flex justify-end px-5">
                        <p>total</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-1/2 border border-gray-200 rounded">bbbbb</div>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center gap-y-5 text-lg text-gray-500">
            <AlertCircle class="w-20 h-20" />
            <p>No reviews completed</p>
        </div> 
    {/if}
</div>