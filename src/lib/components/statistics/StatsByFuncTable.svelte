<script lang="ts">
    import LL from "../../../i18n/i18n-svelte"
    import RadarChart from "$lib/components/statistics/RadarChart.svelte"
    import BarChart from "./BarChart.svelte";

    export let selectedEmployee: any
    export let reviewChoosed: Reviews[]
    export let submissions: any

    let submissionsOfEmployee: any = []
    let responsesByQuestion: any = []
    let questionRatingAnswers: any = []
    let averagesByQuestion: any = []
    let otherQuestions: any[] = []
    let textAnswers: any[] = []
    let singleChoiceAnswers: any[] = []

    $: {
        //Reset variables
        submissionsOfEmployee = []
        responsesByQuestion = []
        questionRatingAnswers = []
        averagesByQuestion = []
        otherQuestions = []
        textAnswers = []
        singleChoiceAnswers = []

        submissions.forEach((submissionsArray: any, index: number) => {
            submissionsArray.forEach((submission: any) => {
                if (submission.evaluatedEmployeeId) {
                    if (submission.evaluatedEmployeeId.employeeId === selectedEmployee.employeeId) {
                        if (!submissionsOfEmployee[index]) {
                            submissionsOfEmployee[index] = []
                        }
                        submissionsOfEmployee[index].push(submission)
                    }
                } else {
                    if (submission.evaluatedDepartmentId.departmentId === selectedEmployee.departmentId) {
                        if (!submissionsOfEmployee[index]) submissionsOfEmployee[index] = []
                        submissionsOfEmployee[index].push(submission)
                    }
                }
            });
        })

        submissionsOfEmployee.forEach((submissionArray: any, index: number) => {
            submissionArray.forEach((submission: any) => {
                submission.reviewResponses.forEach((response:any) => {
                    const questionId = response.questionId
                    const ratingValue = response.ratingValueResponse

                    if (questionId && ratingValue !== undefined) {
                        if (!responsesByQuestion[index]) responsesByQuestion[index] = []
                        if (!responsesByQuestion[index][questionId]) responsesByQuestion[index][questionId] = []
                        responsesByQuestion[index][questionId].push(ratingValue)
                    } 
                    else if (questionId && ratingValue == undefined && response.textResponse !== '') {
                        if (!otherQuestions[index]) otherQuestions[index] = []
                        if (!otherQuestions[index][questionId]) otherQuestions[index][questionId] = []
                        otherQuestions[index][questionId].push(response.textResponse)
                    }
                })
            })
        })

        otherQuestions.forEach((element: any, index: number) => {
            textAnswers[index] = Object.entries(element).map(([questionId, responses]) => {
                const matchingQuestion = reviewChoosed[index].questions.find((question: any) => question.questionId === questionId)

                return {
                    questionId: questionId,
                    responses: responses,
                    titleQuestion: matchingQuestion ? matchingQuestion.translations[0].title : null,
                    typeQuestion: matchingQuestion ? matchingQuestion.responseType : null,
                    title: matchingQuestion ? reviewChoosed[index].translations[0].title : null
                }
            }).filter((temp: any) => temp.typeQuestion === "Text")
        })

        otherQuestions.forEach((element: any, index: number) => {
            singleChoiceAnswers[index] = Object.entries(element).map(([questionId, responses]) => {
                const matchingQuestion = reviewChoosed[index].questions.find((question: any) => question.questionId === questionId)

                return {
                    questionId: questionId,
                    responses: responses,
                    titleQuestion: matchingQuestion ? matchingQuestion.translations[0].title : null,
                    typeQuestion: matchingQuestion ? matchingQuestion.responseType : null,
                    title: matchingQuestion ? reviewChoosed[index].translations[0].title : null,
                    options: matchingQuestion ? matchingQuestion.singleChoiceOptions.map((temp: any) => temp.translations[0].description) : []
                }
            }).filter((temp: any) => temp.typeQuestion === "SingleChoice")
        })

        responsesByQuestion.forEach((element: any, index: number) => {
            questionRatingAnswers[index] = Object.entries(element).map(([questionId, responses]) => {
                const matchingQuestion = reviewChoosed[index].questions.find((question: any) => question.questionId === questionId)

                return {
                    questionId: questionId,
                    responses: responses,
                    title: matchingQuestion ? matchingQuestion.translations[0].title : null
                }
            })
        })

        questionRatingAnswers.forEach((element: any, index: any) => {
            averagesByQuestion[index] = element.map((question: any) => (
                parseFloat((question.responses.reduce((acc: any, value: any) => acc + value, 0) / question.responses.length).toFixed(2))
            ))
        })
    }

    function calcAverage(array: any[]) {
        if (array === undefined || !array || array.length === 0) return 0
        const sum = array.reduce((acc: any, value: any) => acc + value, 0)
        return (sum / array.length).toFixed(2)
    }
</script>

<div class="flex flex-col lg:flex-row gap-x-5 gap-y-5">
    <div class="flex w-full lg:w-[70%] border-2 border-black h-fit overflow-hidden rounded">
        <div class="flex flex-col flex-grow">
            <div class="bg-black text-white h-10 flex justify-center items-center">
                <p>{ selectedEmployee.employeeName || selectedEmployee.userName || selectedEmployee.departmentDescription }</p>
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
            {#if typeof averagesByQuestion[index] === 'object' && averagesByQuestion[index] !== null}
                <div class="flex flex-col w-[15%] border-l-2 border-black">
                    <div class="flex items-center justify-center h-10 border-b-2 border-black overflow-hidden">
                        <p class="overflow-hidden text-ellipsis text-[0.6rem] text-center" title={review.translations[0].title}>{review.translations[0].title}</p>
                    </div>
                    {#each averagesByQuestion[index] as number}
                        <div class="h-[50px] flex justify-center items-center border-b-2 border-black">
                            <p>{number}</p>
                        </div>
                    {/each}
                    <div class="flex justify-center">
                        <p>{calcAverage(averagesByQuestion[index])}</p>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="flex flex-col justify-center items-center w-full lg:w-[30%] border border-gray-200 rounded">
        <div class="flex justify-center w-[350px] h-[350px]">
            <RadarChart {averagesByQuestion} {questionRatingAnswers} title={reviewChoosed.map((review) => review.translations[0].title)} />
        </div>
    </div>
</div>

<!-- Text answers -->
<div class="flex flex-col gap-y-[10px]">
    {#each textAnswers as reviewAnswers, index}
        {#if typeof reviewAnswers === 'object' && reviewAnswers[index] !== null && reviewAnswers.length !== 0 }
            <div class="flex flex-col gap-y-[5px] px-[10px] py-[5px] border border-gray-200 rounded">
                {#each reviewAnswers as textAnswer, jndex}
                    {#if jndex == 0}
                        <p class="font-semibold">{textAnswer.title}</p>
                    {/if}
                    <div class="flex flex-col text-sm">
                        <p class="font-medium text-gray-600 italic">{textAnswer.titleQuestion}</p>
                        {#each textAnswer.responses as response}
                            <li>{response}</li>
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}
    {/each}
</div>

<!-- Charts for single choice options -->
<div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5">
    {#each singleChoiceAnswers as singleChoiceAnswersArray}
        {#if singleChoiceAnswersArray && singleChoiceAnswersArray.length > 0}
            {#each singleChoiceAnswersArray as singleChoiceAnswer}
                <BarChart singleChoiceAnswers={singleChoiceAnswer} />
            {/each}
        {/if}
    {/each}
</div>