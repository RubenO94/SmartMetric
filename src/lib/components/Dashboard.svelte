<script lang="ts">
    import { api } from "$lib/api/_api";
    import { onMount } from "svelte";
    import LL from "../../i18n/i18n-svelte";

    export let user: any

    let submissions: any[] = []

    onMount(async () => {
        const [response] = await Promise.all([
            api("GET", `Submissions/EvaluatorEmployee/${user.employeeId}`)
        ])
        submissions = response?.body
    })

    $: submissions = submissions.filter(temp => temp.submissionDate == null)
</script>

<div class="w-80">
    <div class="flex gap-x-2 px-2 py-2 border-b border-gray-300">
        <p class="font-medium">{$LL.Dashboard()}</p>
    </div>
    <a href="/submissions" class="flex my-5 font-bold text-gray-500">{$LL.Tasklist()} ({submissions.length})</a>
    {#if submissions.length > 0}
        <div class="flex flex-col gap-y-2">
            {#each submissions as submission, index}
                {#if index < 5}
                    <li>
                        <a href="/submissions/{submission.submissionId}">{$LL.Evaluate()}: 
                            {!submission.evaluatedEmployeeId ?
                                submission.evaluatedDepartmentId.departmentDescription :
                                (submission.evaluatedEmployeeId.employeeName === user.userName) ?
                                    $LL.SelfEvaluation.Label() :
                                    submission.evaluatedEmployeeId.employeeName
                            }
                        </a>
                    </li>
                {/if}
            {/each}
        </div>
    {:else}
        <p class="text-xs">{$LL.NoSubmissionsListLabel()}</p>
    {/if}
</div>