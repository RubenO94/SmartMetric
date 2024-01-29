<!-- <script lang="ts">
    import { onMount } from 'svelte'
    import { api } from "$lib/api/_api"
    import { Chart } from 'chart.js';

    export let lang

    let language = lang[0].slice(0, 2)
    let reviews: any
    let ctx: any
    let myChart: any
    let data = {
        labels: ['Completed', 'To complete'],
        datasets: [{
            label: 'My first dataset',
            data: [75, 35],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            borderWidth: 1,
            hoverOffset: 4
        }]
    }

    async function loadReviews() {
        const [reviewsResponse] = await Promise.all([
            api("GET", `Reviews`)
        ])
        reviews = reviewsResponse?.body
    }

    function createChart() {
        ctx = document.getElementById("myChart")
        if (myChart) myChart.destroy()
        myChart = new Chart(ctx, {
            type: 'bar',
            data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }

    onMount(createChart)
</script>

<div class=" w-72 h-60 p-2 rounded-lg border border-gray-300 bg-gray-100">
    <select class="w-full p-1 text-sm rounded-lg border border-gray-300 bg-gray-200">
        {#await loadReviews() then}
            {#each reviews as review}
                {#if review.reviewStatus === 'Active'}
                    {#each review.translations as translation}
                        {#if translation.language.toLowerCase() === language}
                            <option>{translation.title}</option>
                        {/if}
                    {/each}
                {/if}
            {/each}
        {/await}
    </select>

    <canvas id="myChart" width="2" height="1"></canvas>
</div> -->