<script lang="ts">
    import { LL } from '../../i18n/i18n-svelte'

    export let object: any
    export let lang: any
</script>

{#each object.questions as question}
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