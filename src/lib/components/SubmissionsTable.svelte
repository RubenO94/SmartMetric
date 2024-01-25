<script lang="ts">
    import { CircleUserRound, CheckSquareIcon, Folder, Search, Trash2, XSquareIcon} from 'lucide-svelte'
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
        </tbody>
    </table>
</div>