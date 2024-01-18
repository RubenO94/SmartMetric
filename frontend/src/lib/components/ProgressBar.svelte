<script lang="ts">
    import { CheckSquare2, XSquare } from "lucide-svelte"
    import LL from "../../i18n/i18n-svelte"

    export let submissions

    let completed = submissions.filter((submission: any) => submission.submissionDate != null).length
    let others = submissions.length - completed
    let percentage = (completed * 100) / submissions.length
</script>

<div class="flex flex-col gap-y-5">
    <div class="relative">
        <div class="absolute h-6 w-60 border border-gray-300 bg-gray-100 rounded-full"></div>
        <div style="width: {percentage}%" class="absolute h-6 bg-blue-500 rounded-full transition-all"></div>
        <div class="absolute inset-y-3 left-28 flex items-center justify-center font-medium text-black">
            {percentage.toFixed(1)}%
        </div>
    </div>
    <div class="flex flex-col pt-5 gap-y-1">
        <div class="flex items-center px-5 gap-x-2">
            <CheckSquare2 class="text-green-500" />
            <span>{$LL.Submissions.SubmissionsCompleted()}: {completed}</span>
        </div>
        <div class="flex items-center px-5 gap-x-2">
            <XSquare class="text-red-500" />
            <span>{$LL.Submissions.SubmissionsMissing()}: {others}</span>
        </div>
    </div>
</div>