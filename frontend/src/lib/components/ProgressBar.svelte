<script lang="ts">
    import { CheckSquare2, XSquare } from "lucide-svelte"
    import LL from "../../i18n/i18n-svelte"

    export let submissions

    let completed = submissions.filter((submission: any) => submission.submissionDate != null).length
    let others = submissions.length - completed
    let percentage = (completed * 100) / submissions.length
</script>

<div class="flex flex-col gap-y-5">
    <div class="bg-gray-300 w-[400px] mx-auto rounded-full">
        <div class="bg-blue-500 w-0 h-6 rounded-full" style="width: {percentage}%;">
            <p class="text-white pl-4 font-medium">{percentage}%</p>
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