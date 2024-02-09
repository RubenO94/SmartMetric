<script lang="ts">
    import { onMount } from "svelte"
    import LL from "../../i18n/i18n-svelte"

    export let submissions: any
    export let reviews: Reviews[]

    let newData: any = []

    function average(arrayOfRatings: number[]) {
        if (arrayOfRatings.length === 0) return 0
        const sum = arrayOfRatings.reduce((acc, num) => acc + num, 0)
        return (sum /arrayOfRatings.length).toFixed(2)
    }

    onMount(() => {
        submissions.forEach((submission: any) => {
            const review = reviews.find(review => review.reviewId === submission.reviewId)
            if (review) {
                const reviewTitle = review.translations[0].title

                if (!newData[reviewTitle]) {
                    newData[reviewTitle] = []
                }

                submission.reviewResponses.forEach((response: any) => {
                    if (response.ratingValueResponse !== undefined) {
                        newData[reviewTitle].push(response.ratingValueResponse)
                    }
                })
            }
        });
        newData = Object.entries(newData).map(([title, ratings]) => ({ title, ratings }))
    })
</script>

<div class="flex flex-col gap-y-2 w-full">
    <h1 class="font-semibold px-2">{ $LL.YourEvaluations() }</h1>
    <div class="flex flex-col items-start gap-y-5 px-2 py-4 border border-gray-300 bg-gray-100 shadow rounded-md">
        <div class="flex flex-col w-full h-[200px] gap-y-5 justify-center">
            {#if submissions.length > 0}
                {#each newData as data}
                    <div class="flex gap-x-2 px-5 items-center">
                        <p class="text-sm w-40 h-10 overflow-hidden text-ellipsis" title={data.title}>{data.title}</p>
                        <div class="border border-gray-300 bg-gray-200 w-20 h-[15px] overflow-hidden rounded-full">
                            <div class="bg-blue-500 w-10 h-full flex items-center rounded-full">
                            </div>
                        </div>
                        <p>{average(data.ratings)} Avg</p>
                    </div>       
                {/each}
            {:else}
                <p class="text-center">{$LL.ReviewStatusChartLabel()}</p>
            {/if}
        </div>
    </div>
</div>