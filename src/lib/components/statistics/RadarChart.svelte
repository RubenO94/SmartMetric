<script lang="ts">
	import Chart from 'chart.js/auto'
	import {afterUpdate} from 'svelte'

    export let averagesByQuestion: number[]
    export let questionRatingAnswers: any[]
    export let title: string

    let canvasElement: HTMLCanvasElement
	let ctx: any
	let myChart: any
	
	//Function to create chart
	function createChart() {
		ctx = canvasElement.getContext('2d');
		if (myChart) myChart.destroy()
		myChart = new Chart(ctx, { 
            type: 'radar', 
            data: {
                labels: questionRatingAnswers.map((item) => item.title),
                datasets: [{
                    label: title,
                    data: averagesByQuestion
                }]
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