<script lang="ts">
    import Chart from "chart.js/auto";
    import LL from "../../../i18n/i18n-svelte"
    import { onMount } from "svelte";

    export let reviews: Reviews[]

    let ctx: any
    let reviewsStatus: any

    console.log(reviews)

    const data = {
        labels: ['Active', 'Not Started', 'Canceled', 'Completed'],
        datasets: [
            { 
                label: $LL.TopDown.Label(), 
                data: [
                    reviews.filter(review => review.reviewStatus === 'Active' && review.reviewType === 'TopDown').length,
                    reviews.filter(review => review.reviewStatus === 'NotStarted' && review.reviewType === 'TopDown').length,
                    reviews.filter(review => review.reviewStatus === 'Canceled' && review.reviewType === 'TopDown').length,
                    reviews.filter(review => review.reviewStatus === 'Completed' && review.reviewType === 'TopDown').length,
                ] 
            },
            { 
                label: $LL.BottomUp.Label(), 
                data: [
                    reviews.filter(review => review.reviewStatus === 'Active' && review.reviewType === 'BottomUp').length,
                    reviews.filter(review => review.reviewStatus === 'NotStarted' && review.reviewType === 'BottomUp').length,
                    reviews.filter(review => review.reviewStatus === 'Canceled' && review.reviewType === 'BottomUp').length,
                    reviews.filter(review => review.reviewStatus === 'Completed' && review.reviewType === 'BottomUp').length,
                ] 
            },
            { 
                label: $LL.SelfEvaluation.Label(), 
                data: [
                    reviews.filter(review => review.reviewStatus === 'Active' && review.reviewType === 'SelfEvaluation').length,
                    reviews.filter(review => review.reviewStatus === 'NotStarted' && review.reviewType === 'SelfEvaluation').length,
                    reviews.filter(review => review.reviewStatus === 'Canceled' && review.reviewType === 'SelfEvaluation').length,
                    reviews.filter(review => review.reviewStatus === 'Completed' && review.reviewType === 'SelfEvaluation').length,
                ] 
            },
            { 
                label: $LL.Interdepartmental.Label(), 
                data: [
                    reviews.filter(review => review.reviewStatus === 'Active' && review.reviewType === 'Interdepartamental').length,
                    reviews.filter(review => review.reviewStatus === 'NotStarted' && review.reviewType === 'Interdepartamental').length,
                    reviews.filter(review => review.reviewStatus === 'Canceled' && review.reviewType === 'Interdepartamental').length,
                    reviews.filter(review => review.reviewStatus === 'Completed' && review.reviewType === 'Interdepartamental').length,
                ]
            }
        ]
    }

    const options = {
        r: {
            ticks: { stepSize: 1 }
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true }
        }
    }

    function renderChart() {
        ctx = document.getElementById("reviewsStatus")
        reviewsStatus = new Chart(ctx, {
            type: 'bar',
            data,
            options
        })
    }

    onMount(renderChart)
</script>

<div class="flex flex-col items-start gap-y-5 px-2 py-4 border border-gray-300 bg-gray-100 shadow-md rounded-md">
    <h1 class="font-semibold px-2">{ $LL.Sidebar.Reviews() }</h1>
    <div class="flex items-center w-full h-60 justify-center mx-auto">
        {#if reviews.length > 0}
            <canvas id="reviewsStatus" />
        {:else}
            <p class="text-center">{$LL.ReviewStatusChartLabel()}</p>
        {/if}
    </div>
    <div class="flex justify-end w-full text-xs px-2 border-t border-gray-300 text-blue-600 hover:underline">
        <a href="/reviews">{ $LL.SeeMore() }</a>
    </div>
</div>