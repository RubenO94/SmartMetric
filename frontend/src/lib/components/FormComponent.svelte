<script lang="ts">
    import { Steps } from "svelte-steps";
    import LL from "../../i18n/i18n-svelte";
    import { ChevronLeft, ChevronRight } from "lucide-svelte";

    export let formTemplate: FormTemplate

    // variables for steps
    let current = 0
    let steps = [
        { text: $LL.Details() },
        { text: $LL.Questions() },
        { text: $LL.Finalize() }
    ]

    // variable indicating witch lang is on edit, in the moment
    let chooseLanguage: string = formTemplate.translations[0].language

    // Functions for Stepper ----------------------------------------------------------------------------
    const handleStepBackward = (event: Event) => {
        if (current != 0) current -= 1
    }
    const handleStepForward = async (event: Event) => {
        if (current != 2) current += 1
    }

    // Function to show name of languages in all languages ----------------------------------------------
    function showLanguageTranslation(languageAbbrev: string) {
        switch (languageAbbrev) {
            case 'PT':
                return $LL.Portuguese()
            case 'EN':
                return $LL.English()
            case 'ES':
                return $LL.Spanish()
            case 'FR':
                return $LL.French()
            case 'PL':
                return $LL.Polish()
            default:
                return 'This language doesn`t exist'
        }
    }

    $: console.log(formTemplate)
</script>

<div class="flex flex-col text-gray-400 text-xs gap-y-16">
    <Steps clickable={true} size="2.3em" {steps} {current} />

    {#if current == 0}
        <div class="flex flex-col gap-y-10">
            <div class="flex gap-x-5 items-center">
                <p class="text-black text-base font-semibold flex-shrink-0">{$LL.ChooseLanguage()}</p>
                <select bind:value={chooseLanguage} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                    {#each formTemplate.translations as translation}
                        <option value={translation.language}>{showLanguageTranslation(translation.language)}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.FormModelTitleTitle()}</p>
                <p>{$LL.FormModelTitleDescription}</p>
                {#each formTemplate.translations as translation}
                    {#if translation.language == chooseLanguage}
                        <input name="titleForm" class="w-auto my-1 p-2 text-black border rounded peer" bind:value={translation.title} />
                    {/if}
                {/each}
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.FormModelDescriptionTitle()}</p>
                <p>{$LL.FormModelDescriptionDescription()}</p>
                {#each formTemplate.translations as translation}
                    {#if translation.language == chooseLanguage}
                        <textarea name="descriptionForm" rows="8" class="w-auto my-1 p-2 text-black border rounded" bind:value={translation.description}></textarea>
                    {/if}
                {/each}
            </div>
        </div>
    {:else if current == 1}
        <p>current = 1</p>
    {:else}
        <p>current = 2</p>
    {/if}

    <div class="flex justify-between mt-10">
        <button on:click={handleStepBackward} id="buttonGoBack" class="flex items-center gap-x-2 md:text-lg font-semibold px-5 py-2 border border-transparent hover:bg-gray-100 rounded">
            <svelte:component this={ChevronLeft} strokeWidth="4" size={20} />
            {$LL.Return()}
        </button>

        <button on:click={handleStepForward} id="buttonGoForward" class="flex items-center gap-x-2 md:text-lg font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">
            {#if current != 2}
                {$LL.Forward()}
            {:else}
                {$LL.Finalize()}
            {/if}
            <svelte:component this={ChevronRight} strokeWidth="4" size={20} />
        </button>
    </div>
</div>