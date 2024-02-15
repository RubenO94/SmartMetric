<script lang="ts">
    import { Chart } from "chart.js"
    import { onMount } from "svelte"

    export let submissions: any
    export let reviews: Reviews[]

    let ctx: any, myChart: any
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
        renderChart()
    })

    function renderChart() {
        ctx = document.getElementById('myChart')
        if (myChart) myChart.destroy()

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: newData.map((entry: any) => entry.title),
                datasets: [{
                    label: 'Average rating by review',
                    data: newData.map((entry: any) => average(entry.ratings)),
                }]
            },
            options: {
                scales: {
                    x: { display: false },
                    y: { beginAtZero: true }
                }
            }
        })
    }
</script>

<div class="w-full h-60 mt-8 p-5 border border-gray-300 bg-gray-100 shadow rounded">
    <canvas id="myChart" />
</div>