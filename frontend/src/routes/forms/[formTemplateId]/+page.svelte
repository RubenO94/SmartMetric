<script>
    import { LL, locale }from "../../../i18n/i18n-svelte"

    export let data

    let lang = $locale.toUpperCase()
    let formTemplate = data.formTemplate
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    {#each formTemplate.questions as question}
        {#each question.translations as translation}
            {#if translation.language == lang}
                <div class="flex flex-row gap-x-2">
                    <p class="text-blue-500 font-semibold">Q{question.position}</p>

                    <div class="flex flex-col gap-y-1">
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
            {/if}
        {/each}
    {/each}
</div>