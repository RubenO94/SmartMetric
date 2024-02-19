<script lang="ts">
    import LL from "../../i18n/i18n-svelte"
    import StatsByFuncTable from '$lib/components/statistics/StatsByFuncTable.svelte'
    import toast, { Toaster } from "svelte-french-toast"

    export let data

    let reviews = data.reviews
    let employees = data.employees 
    let submissions = data.submissions
    let selectedEmployee = employees[0]
    let selectedReviews: Reviews[] = []
    let selectedSubmissions: any[] = []
    let page = 1

    function handleCheckboxChange(event: any, review: Reviews) {
        const isChecked = event.target.checked
        const reviewIndex = reviews.findIndex((item: any) => item.reviewId === review.reviewId)
        if (isChecked) {
            selectedReviews = [...selectedReviews, review]
            selectedSubmissions = [...selectedSubmissions, submissions[reviewIndex]]
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
        for (let index = reviews.length - 1; index >= 0; index--) {
            if (employees === null || employees.length === 0) {
                reviews.splice(index, 1)
                submissions.splice(index, 1)
                continue
            }

            let reviewShouldBeRemoved = true;

            for (const submission of submissions[index]) {
                const evaluatedEmployeeId = submission.evaluatedEmployeeId.employeeId;

                const matchFound = employees.some((employee: any) => {
                    return employee.employeeId === evaluatedEmployeeId;
                })

                if (matchFound) {
                    reviewShouldBeRemoved = false;
                    break;
                }
            };

            if (reviewShouldBeRemoved) {
                reviews.splice(index, 1)
                submissions.splice(index, 1)
            } 
        }
    }

    handleReviews()
</script>

<svelte:head>
    <title>{$LL.TeamPerformance()}</title>
</svelte:head>

<Toaster />

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-5">
    {#if page == 1}
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
            <button on:click={() => loadSubmissions()} class="p-1 border border-transparent text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-900 rounded-lg">{$LL.Submit()}</button>
        </div>
    {:else if page == 2}
        <p class="font-semibold text-lg">{$LL.EvaluationOf()} {selectedEmployee.employeeName}</p>
        <div class="flex flex-col gap-y-5">
            <p class="text-xs text-gray-400">{$LL.ChooseEmployee()}</p>
                <select bind:value={selectedEmployee} class="border border-gray-300 bg-gray-100 p-2 rounded-lg">
                    {#each employees as employee}
                        <option value="{employee}">{employee.employeeName}</option>
                    {/each}
                </select>
            <StatsByFuncTable selectedEmployee={selectedEmployee} reviewChoosed={selectedReviews} submissions={selectedSubmissions} />
        </div>
    {/if}
</div>