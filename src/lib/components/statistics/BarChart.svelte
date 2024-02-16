<script lang="ts">
    import { Chart } from "chart.js"
    import { afterUpdate } from "svelte"

    export let singleChoiceAnswers: any

    let ctx: any, singleChoiceChart: any
    let dataEachOption: any = []

    function createArrayData() {
        singleChoiceAnswers.options.forEach((option: any) => {
            let data = singleChoiceAnswers.responses.filter((response: any) => response === option).length
            dataEachOption = [...dataEachOption, data]
        })
    }

    function renderChart() {    
        ctx = document.getElementById(`${singleChoiceAnswers.titleQuestion}`)
        if (singleChoiceChart) singleChoiceChart.destroy()

        singleChoiceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: singleChoiceAnswers.options,
                datasets: [{
                    label: singleChoiceAnswers.title,
                    data: dataEachOption
                }]
            },
            options: {
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: singleChoiceAnswers.titleQuestion }
                },
                scales: {
                    x: { stacked: true },
                    y: {
                        stacked: true,
                        ticks: { stepSize: 1 }
                    }
                }
            }
        })
    }

    afterUpdate(() => {
        dataEachOption = []
        createArrayData()
        renderChart()
    })
</script>

<div class="w-full border border-gray-200 shadow rounded">
    <canvas id={singleChoiceAnswers.titleQuestion} />
</div>
