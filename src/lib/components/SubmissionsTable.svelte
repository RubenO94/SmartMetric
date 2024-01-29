<script lang="ts">
    import { CircleUserRound, CheckSquareIcon, Folder, Search, Trash2, XSquareIcon, AlertTriangle} from 'lucide-svelte'
    import LL from '../../i18n/i18n-svelte'
    import { onMount } from 'svelte'
    import { api } from '$lib/api/_api'

    export let review: any

    let submissions: any = []

    async function loadSubmissions() {
        const [response] = await Promise.all([ api("GET", `Reviews/Submissions?reviewId=${review.reviewId}`) ])
        submissions = response?.body
    }

    async function deleteSubmission(submissionId: string) {
        await Promise.all([ api("DELETE", `Submissions/${submissionId}`) ])
        review.submissionsTotal -= 1
        loadSubmissions()
    }

    onMount(async () => {
        loadSubmissions()
    })
</script>

<div class="border border-gray-300 overflow-x-auto shadow rounded-xl">
    <table class="min-w-full">
        <thead class="bg-gray-200">
            <tr>
                <th colspan="5" class="rounded-t-xl">
                    <div class="flex relative mx-20 pt-5">
                        <input type="text" class="w-full text-sm font-normal py-1 px-10 border border-gray-300 rounded-xl" placeholder={$LL.Search()} />
                        <div class="absolute inset-y-0 left-0 pl-3 pt-5 flex items-center pointer-events-none">
                            <Search />
                        </div>
                    </div>
                </th>
            </tr>
            <tr>
                <th>
                    <div class="flex justify-start px-10 py-2">
                        {$LL.SubmissionTable.Evaluator()} 
                    </div>
                </th>
                <th>
                    <div class="flex justify-start px-10 py-2">
                        {$LL.SubmissionTable.Evaluated()} 
                    </div>
                </th>
                <th>
                    <div class="flex justify-start py-2">
                        {$LL.SubmissionTable.SubmissionDate()}
                    </div>
                </th>
                <th>
                    <div class="flex justify-center py-2">
                        {$LL.SubmissionTable.Completed()}
                    </div>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#await loadSubmissions()}
                <tr>
                    <td colspan="5">
                        <div class="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
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
                                    <p class="overflow-x-hidden text-ellipsis">{submission.evaluatorEmployeeId.employeeName}</p>
                                </div>
                            </td>
                            <td>
                                <div class="flex items-center gap-x-2 p-2">
                                    {#if submission.evaluatedEmployeeId == null}
                                        <Folder class="flex-shrink-0 w-6 h-6" />
                                        {submission.evaluatedDepartmentId.departmentDescription}
                                    {:else}
                                        <CircleUserRound class="flex-shrink-0 w-6 h-6" />
                                        {submission.evaluatedEmployeeId.employeeName}
                                    {/if}
                                </div>
                            </td>
                            <td>
                                <div class="flex py-2">
                                    {#if submission.submissionDate}
                                        {submission.submissionDate}
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
                                <button on:click={() => deleteSubmission(submission.submissionId)}>
                                    <Trash2 class="text-gray-500 hover:text-black cursor-pointer" /> 
                                </button> 
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