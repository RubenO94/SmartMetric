<script lang="ts">
	import Chart from 'chart.js/auto'
	import {afterUpdate} from 'svelte'

    export let averagesByQuestion: number[]
    export let questionRatingAnswers: any[]
    export let title: string[]

    let canvasElement: HTMLCanvasElement
	let ctx: any
	let myChart: any
    let datasets: any
    let labels: any

    function getData() {
        datasets = title.map((titleItem, index) => ({
            label: titleItem,
            data: averagesByQuestion[index]
        }))
        questionRatingAnswers.forEach((item, index) => {
            if (index === 0) {
                labels = item.map((i: any) => i.title)
            }
        })
    }
	
	//Function to create chart
	function createChart() {
        getData()
		ctx = canvasElement.getContext('2d');
		if (myChart) myChart.destroy()
		myChart = new Chart(ctx, { 
            type: 'radar', 
            data: {
                labels,
                datasets
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: true },
                        grid: { circular: true },
                        min: 0, 
                        ticks: { stepSize: 1 }
                    }
                }
            }
        });
	}
	
	afterUpdate(createChart)
</script>

<canvas bind:this={canvasElement} id="myChart" />