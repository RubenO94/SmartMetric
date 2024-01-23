<script lang="ts">
    import { LL } from "../../i18n/i18n-svelte"
    import { CheckCircle2, XCircle } from 'lucide-svelte'

    export let data
    let filteredItems = data.submissions
    console.log(filteredItems)
</script>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    <div class="flex flex-col md:flex-row gap-y-5 justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Submissions.Name() }</h1>
    </div>
    
    <!-- Just for test -->
    <div class="flex flex-col shadow-lg rounded-xl">
        <div class="flex justify-end px-5 py-2 border border-gray-300 bg-gray-200 rounded-t-xl">
            <div class="flex gap-x-5">
                <p>{$LL.EndDate()}</p>
                <p>{$LL.Completed()}</p>
            </div>
        </div>
        <div class="flex flex-col border-x border-b border-gray-300 rounded-b-xl">
            {#if filteredItems.length > 0}
                {#each filteredItems as submission, index}
                    <a href={`/submissions/${submission.submissionId}`} class="flex justify-between px-5 py-2 hover:bg-gray-100 cursor-pointer">
                        <p>{index + 1}</p>
                        <div class="flex gap-x-14 pr-5">
                            {#if submission.submissionDate}
                                <p>{submission.evaluatorEmployeeId}</p>
                                <p>{submission.submissionDate}</p>
                                <CheckCircle2 class="text-green-500" />
                            {:else}
                                <p>sem entrega</p>
                                <XCircle class="text-red-500" />
                            {/if}
                        </div>
                    </a>
                    <hr class="text-gray-300">
                {/each}
            {:else}
                <p class="flex justify-between px-5 py-2 hover:bg-gray-100">{$LL.NoSubmissions()}</p>
            {/if}
        </div>
    </div>
</div>