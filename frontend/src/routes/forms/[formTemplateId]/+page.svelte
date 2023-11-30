<script>
    export let data

    let formTemplate = data.formTemplate
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    {#each formTemplate.questions as question, index}
        <div class="flex flex-row gap-x-2">
            <p class="text-blue-500 font-semibold">Q{question.position}</p>

            <div class="flex flex-col gap-y-1">
                <p>{question.translations[0].title}</p>
                <p class="text-gray-400 text-sm">{#if question.translations[0].description}
                    {question.translations[0].description}
                {:else}
                    Question without description
                {/if}
                </p>
            </div>
        </div>
    {/each}
</div>