<script lang="ts">
    import { LL } from "../../i18n/i18n-svelte"
    import { AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-svelte'
    import { Accordion, AccordionItem } from 'flowbite-svelte'
    import { transformDate } from "$lib/actions/handleDate"
    import { goto } from "$app/navigation";

    export let data

    let user = data.user
    let reviews = data.reviews
    let submissions = data.submissions

    function checkSubmission(submission: any) {
        if (submission.submissionDate == null) goto(`/submissions/${submission.submissionId}`)
        else return
    }

    function associateSubmissionsWithReviews() {
        reviews = reviews.map((review: any) => {
            const matchingSubmissions = submissions.filter((submission: any) => submission.reviewId === review.reviewId)
            return {...review, submissions: matchingSubmissions}
        })
    }

    associateSubmissionsWithReviews()
</script>

<svelte:head>
    <title>{$LL.Submissions.Name()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2">
    <div class="flex flex-col gap-y-5 mb-10">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Submissions.Name() }</h1>
        <p class="text-xs text-gray-400">{$LL.SubmissionsDescriptionText()}</p>
    </div>
    
    {#if submissions.length > 0}
        <Accordion>
            {#each reviews as review}
                {#if review.submissions.length > 0}
                    <AccordionItem>
                        <span slot="header">
                            {review.translations[0].title}
                            <p class="text-xs">{$LL.EndDate()} - {transformDate(review.endDate, data.lang[0])}</p>
                        </span>
                        <div slot="arrowup">
                            <ChevronUp class="h-5 w-5" />
                        </div>
                        <div slot="arrowdown">
                            <ChevronDown class="h-5 w-5" />
                        </div>
                        <div class="flex flex-col">
                            {#each review.submissions as submission, index}
                                <button class="flex gap-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg" on:click={() => checkSubmission(submission)}>
                                    <p class="w-[30px]">{index + 1}</p>
                                    <p class="w-full text-start whitespace-nowrap text-ellipsis overflow-hidden">
                                        {$LL.Evaluate()}: 
                                        {!submission.evaluatedEmployeeId ?
                                            submission.evaluatedDepartmentId.departmentDescription :
                                            (submission.evaluatedEmployeeId.employeeName === user?.userName) ?
                                                $LL.SelfEvaluation.Label() :
                                                submission.evaluatedEmployeeId.employeeName
                                        }
                                    </p>
                                    {#if submission.submissionDate}
                                        <CheckCircle2 class="text-green-500" />
                                    {:else}
                                        <XCircle class="text-red-400" />
                                    {/if}
                                </button>
                            {/each}
                        </div>
                    </AccordionItem>
                {/if}
            {/each}
        </Accordion>
    {:else}
        <div class="w-full flex flex-col gap-y-[10px] justify-center items-center">
            <AlertCircle size={50} strokeWidth={1.5} />
            <p>{ $LL.NoSubmissions() }</p>
        </div>
    {/if}
</div>