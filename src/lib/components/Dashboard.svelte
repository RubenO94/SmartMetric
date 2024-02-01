<script lang="ts">
    import { api } from "$lib/api/_api";
    import { onMount } from "svelte";
    import LL from "../../i18n/i18n-svelte";

    export let user: any

    let submissions: any[] = []

    onMount(async () => {
        const [response] = await Promise.all([
            api("GET", `Submissions/Employees/${user.employeeId}`)
        ])
        submissions = response?.body
    })

    $: submissions = submissions.filter(temp => temp.submissionDate == null)
</script>

<div class="w-60">
    <div class="flex gap-x-2 px-2 py-2 border-b border-gray-300">
        <p class="font-medium">{$LL.Dashboard()}</p>
    </div>
    <p class="py-5 font-bold text-gray-500">{$LL.Tasklist()} ({submissions.length})</p>
    {#if submissions.length > 0}
        <div class="flex flex-col gap-y-2">
            {#each submissions as submission}
                <li><a href="/submissions/{submission.submissionId}">{$LL.Evaluate()}: {submission.evaluatedEmployeeId.employeeName}</a></li>
            {/each}
        </div>
    {:else}
        <p class="text-xs">{$LL.NoSubmissionsListLabel()}</p>
    {/if}
</div>