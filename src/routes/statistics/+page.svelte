<script lang="ts">
    import { api } from "$lib/api/_api"
    import { onMount } from "svelte"
    import LL from "../../i18n/i18n-svelte"
    import { AlertCircle } from "lucide-svelte"
    import RadarChart from "$lib/components/statistics/RadarChart.svelte"
    import toast, { Toaster } from "svelte-french-toast"
    import StatsByFuncTable from "$lib/components/statistics/StatsByFuncTable.svelte";

    export let data

    let page = 1
    let reviews: Reviews[] = data.reviews
    let reviewChoosed: Reviews[] = []
    let submissions: any[] = []
    let questionRatingAnswers: any[] = []
    let averagesByQuestion: any[] = []
    let uniqueEmployees: any[] = []
    let employees: any[] = []

    async function loadSubmissions() {
        if (reviewChoosed.length <= 0) {
            toast.error("Need at least one review")
            return
        } 

        page += 1

        try {
            const promises = reviewChoosed.map(async (review) => {
                const response = await api("GET", `Reviews/Submissions?reviewId=${review.reviewId}`)
                return response?.body
            });

            const submissionsResponse = await Promise.all(promises)
            submissions = submissionsResponse
            createObject()
        } catch (error) {
            console.error("Error", error)
        }
    }
    
    function createObject() {
        let responsesByQuestion: any = []

        submissions.forEach((submissionArray, index) => {
            submissionArray.forEach((submission: any) => {
                submission.reviewResponses.forEach((response:any) => {
                    const questionId = response.questionId
                    const ratingValue = response.ratingValueResponse

                    if (questionId && ratingValue !== undefined) {
                        if (!responsesByQuestion[index]) {
                            responsesByQuestion[index] = []
                        }
                        if (!responsesByQuestion[index][questionId]) {
                            responsesByQuestion[index][questionId] = []
                        }
                        responsesByQuestion[index][questionId].push(ratingValue)
                    }
                })
            })
        })

        console.log(submissions)

        responsesByQuestion.forEach((element: any, index: number) => {
            questionRatingAnswers[index] = Object.entries(element).map(([questionId, responses]) => {
                const matchingQuestion = reviewChoosed[index].questions.find((question) => question.questionId === questionId)

                return {
                    questionId: questionId,
                    responses: responses,
                    title: matchingQuestion ? matchingQuestion.translations[0].title : null
                }
            })
        })

        console.log(questionRatingAnswers)

        questionRatingAnswers.forEach((element, index) => {
            averagesByQuestion[index] = element.map((question: any) => (
                parseFloat((question.responses.reduce((acc: any, value: any) => acc + value, 0) / question.responses.length).toFixed(2))
            ))
        })

        console.log(averagesByQuestion)

        submissions.forEach((submissionsArray: any) => {
            submissionsArray.forEach((submission: any) => {
                const evaluatedEmployeeId = submission.evaluatedEmployeeId;
                uniqueEmployees[evaluatedEmployeeId.employeeId] = evaluatedEmployeeId
            });
        });

        employees = Object.values(uniqueEmployees);
    }

    function calcAverage(array: any[], index: number) {
        if (array.length === 0 || !array) return 0
        const sum = array[index].reduce((acc: any, value: any) => acc + value, 0)
        return (sum / array[index].length).toFixed(2)
    }

    function handleCheckboxChange(event: any, review: Reviews) {
        const isChecked = event.target.checked
        if (isChecked) reviewChoosed = [...reviewChoosed, review]
        else reviewChoosed = reviewChoosed.filter((reviewArray) => reviewArray.reviewId !== review.reviewId)
    }
</script>

<svelte:head>
    <title>{$LL.Sidebar.Statistics()}</title>
</svelte:head>

<Toaster />

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">
            {#if reviewChoosed && page == 2}
                { $LL.Sidebar.Statistics() } -
                {#each reviewChoosed as review}
                    {review.translations[0].title}
                    <br>
                {/each}
            {:else}
                { $LL.Sidebar.Statistics() }
            {/if}
        </h1>
    </div>

    {#if reviews.length > 0 && page == 1}
        <div class="flex flex-col gap-y-4">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{ $LL.SelectReview() }</p>
                <p class="text-xs text-gray-400">{ $LL.SelectReviewText() }</p>
            </div>

            {#each reviews as review}
                <label for="{review.reviewId}">
                    <input id="{review.reviewId}" type="checkbox" on:change={(event) => handleCheckboxChange(event, review)} />
                    <span>{review.translations[0].title}</span>
                </label>
            {/each}
            <button on:click={() => loadSubmissions()} class="p-1 border border-transparent text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-900 rounded-lg">{ $LL.Submit()}</button>
        </div>
    {:else if reviews.length > 0 && page == 2}
        <div class="flex flex-col lg:flex-row gap-x-5 gap-y-5">
            <div class="flex w-full lg:w-[60%] border-2 border-black h-fit overflow-hidden rounded">
                <div class="flex flex-col flex-grow">
                    <div class="bg-black text-white h-10 flex justify-center items-center">
                        <p>{ $LL.Average() }</p>
                    </div>
                    {#each reviewChoosed[0].questions as question}
                        {#if question.responseType === 'Rating'}
                            <div class="min-h-[50px] border-b-2 border-black">
                                <div class="bg-gray-200 px-1">
                                    <p class="font-medium text-sm">{question.position} - {question.translations[0].title} </p>
                                </div>
                                <p class="text-xs text-gray-400 px-1">{question.translations[0].description}</p>
                            </div>
                        {/if}
                    {/each}
                    <div class="bg-black text-white flex justify-end px-5">
                        <p>{ $LL.Total() }</p>
                    </div>
                </div>
                {#each reviewChoosed as review, index}
                    <div class="flex flex-col w-[10%] border-l-2 border-black">
                        <div class="flex items-center h-10 border-b-2 border-black">
                            <p class="whitespace-nowrap overflow-hidden text-ellipsis" title={review.translations[0].title}>{review.translations[0].title}</p>
                        </div>
                        {#each averagesByQuestion as row, jndex}
                            {#each row as number}
                                {#if jndex == index}
                                    <div class="h-[50px] flex justify-center items-center border-b-2 border-black">
                                        <p>{number}</p>
                                    </div>
                                {/if}
                            {/each}
                        {/each}
                        <div class="flex justify-center">
                            <p>{calcAverage(averagesByQuestion, index)}</p>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="flex flex-col justify-center items-center w-full lg:w-[40%] border border-gray-200 rounded">
                <div class="flex justify-center w-96 h-96">
                    <RadarChart {averagesByQuestion} {questionRatingAnswers} title={reviewChoosed.map((review) => review.translations[0].title)} />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-y-5">
            <p class="text-black text-base font-semibold">{$LL.Evaluated()}</p>
            <StatsByFuncTable {employees} />
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center gap-y-5 text-lg text-gray-500">
            <AlertCircle class="w-20 h-20" />
            <p>{ $LL.NoReviewsComp() }</p>
        </div>
    {/if}
</div>