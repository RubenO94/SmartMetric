<script lang="ts">
    import { CheckSquare2, XSquare } from "lucide-svelte"
    import LL from "../../i18n/i18n-svelte"

    export let completed: number
    export let total: number
    export let reviewIdPage: boolean

    let sizeProgressBar = 400
    if (!reviewIdPage) sizeProgressBar = 200

    $: percentage = (completed * 100) / total || 0
</script>

<div class="flex flex-col gap-y-1">
    <div class="bg-gray-300 mx-auto rounded-full overflow-hidden" role="progressbar" aria-valuenow="{percentage}" aria-valuemin="0" aria-valuemax="100" style="width: {sizeProgressBar}px;">
        <div class="bg-blue-500 h-5 rounded-full" style="width: {percentage}%;">
            <p class="text-white pl-4 font-medium text-sm">{percentage.toFixed(1)}%</p>
        </div>
    </div>
    {#if reviewIdPage}
        <div class="flex flex-col pt-5 gap-y-1">
            <div class="flex items-center px-5 gap-x-2">
                <CheckSquare2 class="text-green-500" />
                <span>{$LL.Submissions.SubmissionsCompleted()}: {completed}</span>
            </div>
            <div class="flex items-center px-5 gap-x-2">
                <XSquare class="text-red-500" />
                <span>{$LL.Submissions.SubmissionsMissing()}: {total - completed}</span>
            </div>
        </div>
    {/if}
</div>