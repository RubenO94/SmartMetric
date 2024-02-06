<script lang="ts">
    import { api } from "$lib/api/_api"
    import { onMount } from "svelte"
    import LL from "../../i18n/i18n-svelte"
    import { AlertCircle } from "lucide-svelte"
    import RadarChart from "$lib/components/statistics/RadarChart.svelte"

    let page = 1
    let reviews: Reviews[] = []
    let reviewChoosed: Reviews
    let submissions: any[] = []
    let questionRatingAnswers: any[] = []
    let averagesByQuestion: number[] = []

    function createObject() {
        let responsesByQuestion: any[] = []

        submissions.forEach(submission => {
            // Iterate through reviewResponses in each submission
            submission.reviewResponses.forEach((response: any) => {
                const questionId = response.questionId;
                const ratingValue = response.ratingValueResponse;

                if (questionId && ratingValue !== undefined) {
                    // Check if questionId already exists in responsesByQuestion
                    if (!responsesByQuestion[questionId]) {
                        responsesByQuestion[questionId] = [];
                    }

                    // Add the response to the array
                    responsesByQuestion[questionId].push(ratingValue);
                }
            });
        });

        // Convert the object to an array of objects
        questionRatingAnswers = Object.entries(responsesByQuestion).map(([questionId, responses]) => {
            const matchingQuestion = reviewChoosed.questions.find((question) => question.questionId === questionId);

            return {
                questionId: questionId,
                responses: responses,
                title: matchingQuestion ? matchingQuestion.translations[0].title : null
            }
        });

        // Create array of averages
        averagesByQuestion = questionRatingAnswers.map(question => (
            parseFloat((question.responses.reduce((acc: any, value: any) => acc + value, 0) / question.responses.length).toFixed(2))
        ));
    }

    function calcAverage(array: number[]) {
        if (array.length === 0) return 0
        const sum = array.reduce((acc, value) => acc + value, 0)
        return (sum / array.length).toFixed(2)
    }

    onMount(async () => {
        const [reviewsResponse] = await Promise.all([api("GET", `Reviews`)])
        reviews = reviewsResponse?.body
        reviews = reviews.filter((review: any) => review.reviewStatus === 'Completed')
    })

    async function loadSubmissions() {
        page += 1
        const [submissionsResponse] = await Promise.all([api("GET", `Reviews/Submissions?reviewId=${reviewChoosed.reviewId}`)])
        submissions = submissionsResponse?.body
        createObject()
    }
</script>

<svelte:head>
    <title>{$LL.Sidebar.Statistics()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">
            {#if reviewChoosed && page == 2}
                { $LL.Sidebar.Statistics() } - { reviewChoosed.translations[0].title }
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
            <select bind:value={reviewChoosed} class="py-2 px-4 border border-gray-300 bg-gray-100 rounded-lg">
                {#each reviews as review}
                    <option value="{review}">{review.translations[0].title}</option>
                {/each}
            </select>
            <button on:click={() => loadSubmissions()} class="p-1 border border-transparent text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-900 rounded-lg">Submit</button>
        </div>
    {:else if reviews.length > 0 && page == 2}
        <div class="flex flex-col lg:flex-row gap-x-5 gap-y-5">
            <div class="flex flex-grow border-2 border-black h-fit overflow-hidden rounded">
                <div class="flex flex-col w-[90%]">
                    <div class="bg-black text-white h-10 flex justify-center items-center">
                        <p>{ $LL.Average() }</p>
                    </div>
                    {#each reviewChoosed.questions as question}
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
                <div class="flex flex-col w-[10%] border-l-2 border-black">
                    <div class="flex items-center h-10 border-b-2 border-black">
                        <p class="whitespace-nowrap overflow-hidden text-ellipsis" title={reviewChoosed.translations[0].title}>{reviewChoosed.translations[0].title}</p>
                    </div>
                    {#each questionRatingAnswers as row}
                        <div class="h-[50px] flex justify-center items-center border-b-2 border-black">
                            <p>{calcAverage(row.responses)}</p>
                        </div>
                    {/each}
                    <div class="flex justify-center">
                        <p>{calcAverage(averagesByQuestion)}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col justify-center items-center w-full lg:w-1/2 border border-gray-200 rounded">
                <div class="flex justify-center w-96 h-96">
                    <RadarChart {averagesByQuestion} {questionRatingAnswers} title={reviewChoosed.translations[0].title} />
                </div>
            </div>
        </div>
        <div class="border border-gray-300 overflow-hidden rounded-t">
            <div class="bg-gray-100 h-20 flex justify-center items-center">
                <p>Tabela de avaliados</p>
            </div>
        </div>
    {:else}
        <div class="flex flex-col justify-center items-center gap-y-5 text-lg text-gray-500">
            <AlertCircle class="w-20 h-20" />
            <p>{ $LL.NoReviewsComp() }</p>
        </div>
    {/if}
</div>