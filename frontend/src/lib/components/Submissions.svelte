<script lang="ts">
    import { Bell } from 'lucide-svelte'
    import { onMount } from 'svelte'
    import LL from '../../i18n/i18n-svelte'
    import { api } from '$lib/api/_api'
    import { goto } from '$app/navigation'

    export let user: any

    let submissions: any[] = []

    onMount(async () => {
        const [response] = await Promise.all([api("GET", `Submissions/Employees/${user.employeeId}`)])
        submissions = response?.body
    })
</script>

<button class="flex flex-col w-[300px] shadow-lg rounded-xl" on:click={() => goto("/submissions")}>
    <div class="flex gap-x-2 w-full p-5 border text-gray-700 border-gray-300 bg-gray-200 rounded-t-xl">
        <Bell />
        <p class="font-medium">{$LL.SubmissionsToDo()}</p>
    </div>
    <div class="flex flex-col w-full p-5 border-b border-x border-gray-300 rounded-b-xl">
        {#if submissions.filter((temp) => temp.submissionDate == null).length > 0}
            <p>{$LL.Submissions.Name()}: {submissions.filter((temp) => temp.submissionDate == null).length}</p>
        {:else}
            <p>{$LL.NoSubmissions()}</p>
        {/if}
    </div>
</button>