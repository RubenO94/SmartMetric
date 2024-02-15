<script lang="ts">
    import { CircleUserRound, CheckSquareIcon, Folder, Search, Trash2, XSquareIcon, ChevronLeft, ChevronRight, X } from 'lucide-svelte'
    import LL from '../../i18n/i18n-svelte'
    import { onMount } from 'svelte'
    import { api } from '$lib/api/_api'
    import { transformDate } from '$lib/actions/handleDate';

    export let review: any
    export let lang: string

    let submissions: any = []
    let totalSubmissions: number, firstElement: number, lastElement: number = 0
    let currentSubPage: number = 1
    let pageSize: number = 10
    let searchName = ""

    function changePage(change: string) {
        if (change === 'increment' && currentSubPage < Math.ceil(totalSubmissions / pageSize)) currentSubPage++
        else if (change === 'decrement' && currentSubPage > 1) currentSubPage--
        loadSubmissions()
    }

    async function loadSubmissions() {
        const [response] = await Promise.all([
            api("GET", `Reviews/Submissions?reviewId=${review.reviewId}&page=${currentSubPage}&pageSize=${pageSize}&name=${searchName}`)
        ])

        if (response) {
            submissions = response.body
            totalSubmissions = response.total
        } else {
            console.error("Failed to fetch submissions")
        }
    }

    async function deleteSubmission(submissionId: string) {
        await Promise.all([ api("DELETE", `Submissions/${submissionId}`) ])
        review.submissionsTotal -= 1
        loadSubmissions()
    }

    onMount(async () => {
        loadSubmissions()
    })

    $: {
        firstElement = Math.min((currentSubPage - 1) * pageSize + 1, totalSubmissions)
        lastElement = Math.min(currentSubPage * pageSize, totalSubmissions)
    }
</script>

<div class="flex flex-col gap-y-[10px]">
    <div>
        Showing 
        <select bind:value={pageSize} on:change={() => { currentSubPage = 1; loadSubmissions() }} class="border border-gray-300">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
        </select>
        rows per page
    </div>

    <div class="border border-gray-300 max-h-[516px] h-fit overflow-hidden overflow-y-auto shadow rounded">
        <table class="min-w-full">
            <thead class="bg-gray-200 sticky top-0">
                <tr>
                    <th colspan="5">
                        <div class="flex relative mx-20 pt-5">
                            <input bind:value={searchName} on:input={() => { currentSubPage = 1; loadSubmissions() }} type="text" class="w-full text-sm font-normal py-1 px-10 border border-gray-300 rounded-xl" placeholder={$LL.Search()} />
                            <div class="absolute inset-y-0 left-0 pl-3 pt-5 flex items-center pointer-events-none">
                                <Search />
                            </div>  
                        </div>
                    </th>
                </tr>
                <tr class="h-10">
                    <th class="w-[30%]">
                        <p>{$LL.SubmissionTable.Evaluator()}</p>
                    </th>
                    <th class="w-[30%]">
                        {$LL.SubmissionTable.Evaluated()} 
                    </th>
                    <th class="w-[25%]">
                        {$LL.SubmissionTable.SubmissionDate()}
                    </th>
                    <th class="w-[10%]">
                        {$LL.SubmissionTable.Completed()}
                    </th>
                    <th class="w-[5%]"></th>
                </tr>
            </thead>
            <tbody>
                {#await loadSubmissions()}
                    <tr>
                        <td colspan="5">
                            <div class="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
                            </div>
                        </td>
                    </tr>
                {:then}
                    {#if submissions.length > 0}
                        {#each submissions as submission (submission.submissionId)}
                            <tr class="hover:bg-gray-100">
                                <td>
                                    <div class="flex items-center gap-x-2 p-2">
                                        <CircleUserRound class="flex-shrink-0 w-6 h-6" /> 
                                        <p class="overflow-x-hidden text-ellipsis whitespace-nowrap text-sm">{submission.evaluatorEmployeeId.employeeName}</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-x-2 p-2">
                                        {#if submission.evaluatedEmployeeId == null}
                                            <Folder class="flex-shrink-0 w-6 h-6" />
                                            <p class="text-sm">{submission.evaluatedDepartmentId.departmentDescription}</p>
                                        {:else}
                                            <CircleUserRound class="flex-shrink-0 w-6 h-6" />
                                            <p class="text-sm">{submission.evaluatedEmployeeId.employeeName}</p>
                                        {/if}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex py-2">
                                        {#if submission.submissionDate}
                                            <p class="text-sm">{transformDate(submission.submissionDate, lang)}</p>
                                        {/if}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex justify-center py-2">
                                        {#if submission.submissionDate}
                                            <CheckSquareIcon class="text-green-400" />
                                        {:else}
                                            <XSquareIcon class="text-red-400" />
                                        {/if}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex justify-center py-2">
                                        <button on:click={() => deleteSubmission(submission.submissionId)}>
                                            <Trash2 class="text-gray-500 hover:text-black cursor-pointer" /> 
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td colspan="5">
                                <p class="flex px-10 py-2">{$LL.NoSubmissionsYet()}</p>
                            </td>
                        </tr>
                    {/if}
                {/await}
            </tbody>
        </table>
    </div>

    <div class="flex justify-between text-sm px-[5px]">
        <p>Showing {firstElement} to {lastElement} of {totalSubmissions} items</p>
        <div class="flex gap-x-[10px]">
            <button on:click={() => changePage("decrement")} class="mx-auto border border-gray-200 hover:bg-gray-100 shadow rounded"><ChevronLeft /></button>
            <button on:click={() => changePage("increment")} class="mx-auto border border-gray-200 hover:bg-gray-100 shadow rounded"><ChevronRight /></button>
        </div>
    </div>
</div>