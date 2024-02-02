<script lang="ts">
    import LL from '../../../i18n/i18n-svelte'
    import { enhance } from '$app/forms'
    import { AlertCircle } from 'lucide-svelte'
    export let data

    let submission = data.submission
    let questions = data.questions
    let success = false
    let submitFlag = false
</script>

<svelte:head>
    <title>{$LL.Submissions.NameSingle()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 gap-y-10">
    <form method="post" use:enhance={() => { success = true }}>
        <div class="flex pb-4">
            <h1 class="font-semibold text-xl">{$LL.Evaluating()}: {submission.evaluatedEmployeeId.employeeName ? submission.evaluatedEmployeeId.employeeName : submission.evaluatedDepartmentId.departmentDescription }</h1>
        </div>
        <div class="flex flex-col overflow-hidden shadow border border-gray-300 rounded-lg">
            <div class="flex flex-col w-full md:px-10 px-2 pt-5 pb-20 gap-y-10">
                {#each questions as question, index}
                    <div class="flex flex-col gap-y-4">
                        <p class="font-medium text-lg">{index + 1}. {question.translations[0].title} {question.isRequired ? '*' : '' }</p>
                        {#if question.responseType == 'Rating'}
                            <div class="flex gap-x-5 mx-5">
                                {#each question.ratingOptions as rto}
                                    <div class="flex items-center">
                                        <input 
                                            id="{rto.ratingOptionId}" 
                                            type="radio" 
                                            value="{rto.numericValue}" 
                                            name="{question.questionId}" 
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
                                            required
                                        />
                                        <label for="{rto.ratingOptionId}" class="ms-2 text-sm font-medium text-gray-600">{rto.numericValue} - {rto.translations[0].description}</label>
                                    </div>
                                {/each}
                            </div>
                        {:else if question.responseType == 'SingleChoice'}
                            <div class="flex gap-x-5 mx-5">
                                {#each question.singleChoiceOptions as sco}
                                    <div class="flex items-center">
                                        <input 
                                            id="{sco.singleChoiceOptionId}" 
                                            type="radio" 
                                            value="{sco.translations[0].description}" 
                                            name="{question.questionId}"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
                                        />
                                        <label for="{sco.singleChoiceOptionId}" class="ms-2 text-sm font-medium text-gray-600">{sco.translations[0].description}</label>
                                    </div>
                                {/each}
                            </div>
                        {:else if question.responseType == 'Text'}
                            <textarea name="{question.questionId}" class="border border-gray-300 mr-5 text-sm p-2 rounded" rows="4" ></textarea>
                        {/if}
                    </div>
                {/each}
            </div>
            <p class="flex justify-end text-xs md:px-[60px] px-4 py-1">* {$LL.Required().toLowerCase()}</p>
            <hr>
            <div class="flex md:px-[60px] px-4 py-5 justify-end">
                <button class="flex py-2 px-5 border border-transparent hover:bg-blue-700 hover:border-blue-950 bg-blue-500 text-white rounded-lg" type="submit">
                    {$LL.Submit()}
                </button>
            </div>
        </div>
    </form>
</div>