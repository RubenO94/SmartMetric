<script lang="ts">
    import LL from "../../i18n/i18n-svelte"
    import StatsByFuncTable from '$lib/components/statistics/StatsByFuncTable.svelte'

    export let data

    let reviews = data.reviews
    let employees = data.employees
    let submissions = data.submissions
    let selectedEmployee = employees[0]
    let selectedReviews: any[] = []
    let page = 1

    function handleCheckboxChange(event: any, review: Reviews) {
        const isChecked = event.target.checked
        if (isChecked) {
            selectedReviews = [...selectedReviews, review]
        }
        else selectedReviews = selectedReviews.filter((reviewArray: any) => reviewArray.reviewId !== review.reviewId)
    }

    function loadSubmissions() {
        page++
    }

    $: console.log(selectedReviews)
    $: console.log(submissions)
</script>

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
            <button on:click={() => loadSubmissions()} class="p-1 border border-transparent text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-900 rounded-lg">{ $LL.Submit()}</button>
        </div>
    {:else if page == 2}
        <p class="font-semibold text-lg">Evaluation of {selectedEmployee.employeeName}</p>
        <div class="flex flex-col gap-y-5">
            <p class="text-xs text-gray-400">{$LL.ChooseEmployee()}</p>
                <select bind:value={selectedEmployee} class="border border-gray-300 bg-gray-100 p-2 rounded-lg">
                    {#each employees as employee}
                        <option value="{employee}">{employee.employeeName}</option>
                    {/each}
                </select>
            <StatsByFuncTable selectedEmployee={selectedEmployee} reviewChoosed={reviews} {submissions} />
        </div>
    {/if}
</div>