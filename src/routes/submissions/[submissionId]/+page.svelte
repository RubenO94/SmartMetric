<script lang="ts">
    import LL from '../../../i18n/i18n-svelte'
    import { enhance } from '$app/forms'
    export let data

    let review = data.review
    let success = false
</script>

<div class="mx-auto flex flex-col h-full xl:w-[1280px] py-5 md:px-5 px-2 gap-y-10">
    <form method="post" class="flex-grow" use:enhance={() => { success = true }}>
        <div class="flex pb-4">
            <h1 class="font-semibold text-xl">{$LL.Evaluating()}: nome</h1>
        </div>
        <div class="flex flex-col overflow-hidden shadow border border-gray-300 rounded-lg">
            <!-- <div class="flex w-full border-b border-gray-300 bg-gray-200 p-5">
                <h1 class="font-semibold text-2xl mx-auto">{$LL.Form()}</h1>
            </div> -->
            <div class="flex flex-col w-full px-10 pt-5 pb-20 gap-y-5">
                {#each review.questions as question, index}
                    <div class="flex flex-col gap-y-2">
                        <p class="font-medium">{index + 1}. {question.translations[0].title}</p>
                        {#if question.responseType == 'Rating'}
                            <div class="flex gap-x-5">
                                {#each question.ratingOptions as rto}
                                    <div class="flex flex-col w-20 gap-y-2 items-center">
                                        <p class="text-xs text-gray-400 whitespace-nowrap">{rto.translations[0].description}</p>
                                        <input type="radio" id={question.questionId + rto.numericValue} name={question.questionId} value={rto.numericValue} class="hidden peer" />
                                        <label for={question.questionId + rto.numericValue} class="w-10 h-10 p-1 inline-flex items-center justify-center cursor-pointer text-gray-400 bg-white hover:bg-blue-500 hover:text-white peer-checked:bg-blue-500 peer-checked:text-white fill-blue-500 hover:fill-white peer-checked:fill-white border-2 border-blue-500 rounded-full">
                                            <p>{rto.numericValue}</p>
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        {:else if question.responseType == 'SingleChoice'}
                            <div class="flex gap-x-5">
                                {#each question.singleChoiceOptions as sco}
                                    <label class="flex gap-x-2 py-2 rounded-lg">
                                        <input type="radio" name="radio" />
                                        <p>{sco.translations[0].description}</p>
                                    </label>
                                {/each}
                            </div>
                        {:else if question.responseType == 'Text'}
                            <textarea></textarea>
                        {/if}
                    </div>
                {/each}
            </div>
            <hr>
            <div class="flex px-10 py-5 justify-end">
                <button class="flex py-2 px-5 border border-transparent hover:bg-blue-700 hover:border-blue-950 bg-blue-500 text-white rounded-lg" type="submit">
                    {$LL.Submit()}
                </button>
            </div>
        </div>
    </form>
</div>