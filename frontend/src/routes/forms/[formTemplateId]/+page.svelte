<script>
    import { LL, locale }from "../../../i18n/i18n-svelte"

    export let data

    let lang = $locale.toUpperCase()
    let formTemplate = data.formTemplate
    console.log(formTemplate)
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    <div class="flex">
        <p class="font-semibold text-2xl">{$LL.Form()}</p>  
        <a href="/forms/{formTemplate.formTemplateId}/edit" class="ml-auto flex gap-x-2 items-center font-semibold py-2 px-4 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            {$LL.EditFormButton()}
        </a>
    </div>
    {#each formTemplate.questions as question}
        {#each question.translations as translation}
            {#if translation.language == lang}
                <div class="flex flex-col gap-y-2">
                    <div class="flex gap-x-2">
                        <p class="text-blue-500 font-semibold">Q{question.position}</p>

                        <div class="flex flex-col gap-y-1 w-full">
                            <p>{translation.title}</p>
                            <p class="text-gray-400 text-sm">
                                {#if translation.description}
                                    {translation.description}
                                {:else}
                                    {$LL.QuestionWithoutDesc()}
                                {/if}
                            </p>
                        </div>
                    </div>
                    <div class="flex w-full gap-x-5">
                        {#if question.responseType == 'Text'}
                            <p class="bg-gray-100 text-gray-400 border border-gray-300 px-5 py-2 w-full rounded">Answer...</p>
                        {:else if question.responseType == 'SingleChoice'}
                            {#each question.singleChoiceOptions as sco}
                                <div class="flex gap-x-2 bg-gray-100 text-gray-400 border border-gray-300 px-2 py-2 rounded">
                                    <svg class="text-gray-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2"/></svg>
                                    {#each sco.translations as translation}
                                        {#if translation.language == lang}
                                            {translation.description}
                                        {/if}
                                    {/each}
                                </div>
                            {/each}
                        {:else if question.responseType == 'Rating'}
                            {#each question.ratingOptions as rto}
                                <div class="flex flex-col items-center">
                                    <svg class="text-gray-300" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2"/></svg>
                                    <p class="text-gray-300">{rto.numericValue}</p>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            {/if}
        {/each}
    {/each}
</div>