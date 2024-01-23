<script lang="ts">
    import LL from '../../../i18n/i18n-svelte'
    export let data

    let review = data.review
</script>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 gap-y-10">
    <div class="flex flex-col md:flex-row gap-y-5 justify-between">
        <h1 class="font-semibold text-2xl mx-auto">{$LL.Form()}</h1>
    </div>
    {#each review.questions as question, index}
        <div class="flex flex-col gap-y-2">
            <p>{index + 1}. {question.translations[0].title} {question.isRequired ? '(obrigatória)' : ''}</p>
            {#if question.responseType == 'Rating'}
                <div class="flex gap-x-5">
                    {#each question.ratingOptions as rto}
                        <div class="flex flex-col w-40 items-center">
                            <p class="text-xs text-gray-400">{rto.translations[0].description}</p>
                            <input type="radio" id={question.questionId + rto.numericValue} name={question.questionId} value={rto.numericValue} class="hidden peer" />
                            <label for={question.questionId + rto.numericValue} class="w-11 h-11 p-1 inline-flex items-center justify-center cursor-pointer text-gray-400 bg-white hover:bg-blue-500 hover:text-white peer-checked:bg-blue-500 peer-checked:text-white fill-blue-500 hover:fill-white peer-checked:fill-white border-2 border-blue-500 rounded-full">
                                <p>{rto.numericValue}</p>
                            </label>
                        </div>
                    {/each}
                </div>
            {:else if question.responseType == 'SingleChoice'}
                <div class="flex gap-x-5">
                    {#each question.singleChoiceOptions as sco}
                        <div class="flex flex-col">
                            <input type="radio" name={question.questionId} />
                            <p>{sco.translations[0].description}</p>
                        </div>
                    {/each}
                </div>
            {:else}
                <p>??Text answer</p>
            {/if}
        </div>
    {/each}
</div>