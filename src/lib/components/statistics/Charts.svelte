<script lang="ts">
    import Chart from "chart.js/auto"
    import LL from "../../../i18n/i18n-svelte"
    import { onDestroy, onMount } from "svelte"

    export let reviews: any

    let myChart: any
    let ctx: any
    let currentReviewIndex = 0
    let intervalId: any

    onMount(() => {
        if (reviews.length > 0) {
            renderChart()
            if (reviews.length > 1) {
                startCarousel()
            }
        }
    })

    onDestroy(() => {
        if (myChart) myChart.destroy()
        clearInterval(intervalId)
    })

    function renderChart() {
        ctx = document.getElementById("myChart")
        if (myChart) myChart.destroy()
        let currentReview = reviews[currentReviewIndex]

        const doughnutLabel = {
            id: 'doughnutLabel',
            beforeDatasetsDraw(chart: any) {
                const { ctx } = chart
                ctx.save()
                const xCoor = chart.getDatasetMeta(0).data[0].x
                const yCoor = chart.getDatasetMeta(0).data[0].y
                let textCenter = ((currentReview.submissionsCompleted * 100) / currentReview.submissionsTotal).toFixed(1) + '%'
                ctx.font = 'bold 30px'
                ctx.fillStyle = 'rgb(59, 130, 246)'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(textCenter, xCoor, yCoor)
            }
        }

        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'To Do'],
                datasets: [{
                    label: 'Submissions',
                    data: [currentReview.submissionsCompleted, currentReview.submissionsTotal - currentReview.submissionsCompleted],
                    backgroundColor: ['rgb(59, 130, 246)', 'rgb(229 231 235)'],
                    borderColor: 'rgb(209 213 219)',
                    borderWidth: 1
                }]
            },
            options: { 
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: currentReview.translations[0].title }
                },
                responsive: true,
            },
            plugins: [doughnutLabel]
        })
    }

    function startCarousel() {
        intervalId = setInterval(() => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length
            if (document.getElementById("myChart")) {
                renderChart()
            } else {
                clearInterval(intervalId)
            }
        }, 5000)
    }
</script>

<div class="flex flex-col items-start gap-y-1 px-2 py-4 border border-gray-300 bg-gray-100 shadow-md rounded-md">
    <h1 class="font-semibold px-2">{$LL.ProgressReview()}</h1>
    <div class="w-40 h-40 flex items-center justify-center mx-auto">
        {#if reviews.length > 0}
            <canvas id="myChart" />
        {:else}
            <p class="text-center">{$LL.ReviewProgressChartLabel()}</p>
        {/if}
    </div>
</div>