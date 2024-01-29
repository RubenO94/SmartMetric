<script lang="ts">
    import { LL } from "../../i18n/i18n-svelte"
    import { AlertCircle, CheckCircle2, XCircle } from 'lucide-svelte'
    import { Accordion, AccordionItem } from 'flowbite-svelte'
    import { transformDate } from "$lib/actions/handleDate"

    export let data

    let reviews = data.reviews
    let submissions = data.submissions

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
                        <div class="flex flex-col">
                            {#each review.submissions as submission, index}
                                <a href={`submissions/${submission.submissionId}`} class="flex gap-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                                    <p class="w-[30px]">{index + 1}</p>
                                    <p class="w-full whitespace-nowrap text-ellipsis overflow-hidden">{$LL.Evaluate()}: {submission.evaluatedEmployeeId.employeeName}</p>
                                    {#if submission.submissionDate}
                                        <CheckCircle2 class="text-green-500" />
                                    {:else}
                                        <XCircle class="text-red-400" />
                                    {/if}
                                </a>
                            {/each}
                        </div>
                    </AccordionItem>
                {/if}
            {/each}
        </Accordion>
    {:else}
        <div class="w-full">
            <AlertCircle size={50} />
            <p>sdfkjsdhf</p>
        </div>
    {/if}
</div>