<script lang="ts">
    import toast, { Toaster } from "svelte-french-toast";
    import LL from "../../i18n/i18n-svelte"
    import StatsByFuncTable from "$lib/components/statistics/StatsByFuncTable.svelte";
    import ReviewsStatusChart from "$lib/components/statistics/ReviewsStatusChart.svelte";

    export let data

    let page = 1
    let selectedReviews: Reviews[] = []
    let selectedSubmissions: any[] = []

    function handleCheckboxChange(event: any, review: Reviews) {
        const isChecked = event.target.checked
        const reviewIndex = data.reviews.findIndex((item: any) => item.reviewId === review.reviewId)
        if (isChecked) {
            selectedReviews = [...selectedReviews, review]
            selectedSubmissions = [...selectedSubmissions, data.submissions[reviewIndex]]
        }
        else {
            const submissionIndexToDelete = selectedReviews.findIndex((temp: any) => temp.reviewId === review.reviewId)
            selectedReviews = selectedReviews.filter((temp: any) => temp.reviewId !== review.reviewId)
            selectedSubmissions = selectedSubmissions.filter((temp: any, index: number) => index !== submissionIndexToDelete )
        }
    }

    function loadSubmissions() {
        if (selectedReviews.length <= 0) {
            toast.error("Need at least one review")
            return
        }

        const isValid = compareRatingQuestions()
        if (!isValid) {
            toast.error("Reviews choosed don't have the same rating questions")
            return
        }

        page++
    }

    function compareRatingQuestions() {
        if (selectedReviews.length < 2) return true

        const referenceQuestions = selectedReviews[0].questions
            .filter(question => question.responseType === "Rating")
            .map(question => question.translations[0].title)
        
        for (let i = 1; i < selectedReviews.length; i++) {
            const reviewQuestions = selectedReviews[i].questions
                .filter(question => question.responseType === "Rating")
                .map(question => question.translations[0].title)

            referenceQuestions.sort()
            reviewQuestions.sort()

            if (referenceQuestions.length !== reviewQuestions.length) return false

            for (let j = 0; j < referenceQuestions.length; j++) {
                if (referenceQuestions[j] !== reviewQuestions[j]) return false
            }
        }

        return true
    }

    function handleReviews() {
        for (let index = data.reviews.length - 1; index >= 0; index--) {
            let reviewShouldBeRemoved = true

            for (const submission of data.submissions[index]) {
                const evaluatedEmployeeId = submission.evaluatedEmployeeId?.employeeId
                
                if (evaluatedEmployeeId === data.user?.employeeId) {
                    reviewShouldBeRemoved = false
                    break
                }
            }

            if (reviewShouldBeRemoved) {
                data.reviews.splice(index, 1)
                data.submissions.splice(index, 1)
            }
        }
    }

    handleReviews()
</script>

<svelte:head>
    <title>{$LL.Performance()}</title>
</svelte:head>

<Toaster />

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-5">
    {#if page == 1}
        <div class="flex flex-col gap-y-5">
            <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Performance() }</h1>
        </div>
        <div class="flex flex-col gap-y-4">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{ $LL.SelectReview() }</p>
                <p class="text-xs text-gray-400">{ $LL.SelectReviewText() }</p>
            </div>

            {#each data.reviews as review}
                <label for="{review.reviewId}">
                    <input id="{review.reviewId}" type="checkbox" on:change={(event) => handleCheckboxChange(event, review)} />
                    <span>{review.translations[0].title}</span>
                </label>
            {/each}
            <button on:click={() => loadSubmissions()} class="p-1 border border-transparent text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-900 rounded-lg">{$LL.Submit()}</button>
        </div>
    {:else if page == 2}
        <div class="flex flex-col gap-y-5">
            <StatsByFuncTable selectedEmployee={data.user} reviewChoosed={selectedReviews} submissions={selectedSubmissions} />
        </div>
    {/if}
</div>