<script lang="ts">
    import Dropdown from "$lib/components/Dropdown.svelte"
    import PreviewForm from "$lib/components/PreviewForm.svelte";
    import { LL, locale }from "../../../i18n/i18n-svelte"

    export let data

    let formTemplate = data.formTemplate
    let lang = formTemplate.translations[0].language

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
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    <div class="flex justify-between">
        <p class="font-semibold text-2xl">{$LL.Form()}</p>  
        <!-- <a href="/forms/{formTemplate.formTemplateId}/edit" class="ml-auto flex gap-x-2 items-center font-semibold py-2 px-4 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            {$LL.EditFormButton()}
        </a> -->
        <div class="flex gap-x-2 items-center">
            <Dropdown bind:object={formTemplate} />             
            <select bind:value={lang} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1 rounded-lg">
                {#each formTemplate.translations as translation}
                    <option value={translation.language}>{$LL.ShowFormIn()} {showLanguageTranslation(translation.language)}</option>
                {/each}
            </select>
        </div>
    </div>
    <PreviewForm bind:object={formTemplate} bind:lang={lang} />
</div>