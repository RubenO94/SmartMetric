<script lang="ts">
    import Dropdown from "$lib/components/Dropdown.svelte"
    import PreviewForm from "$lib/components/PreviewForm.svelte";
    import { LL, locale }from "../../../i18n/i18n-svelte"

    export let data

    let formTemplate = data.formTemplate
    let user = data.user
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

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    <div class="flex flex-col md:flex-row gap-y-5 justify-between">
        <p class="font-semibold text-2xl">{$LL.Form()}</p>
        <div class="flex gap-x-2 items-center justify-end">
            <Dropdown bind:object={formTemplate} {user} />             
            <select bind:value={lang} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1 rounded-lg">
                {#each formTemplate.translations as translation}
                    <option value={translation.language}>{$LL.ShowFormIn()} {showLanguageTranslation(translation.language)}</option>
                {/each}
            </select>
        </div>
    </div>
    <PreviewForm bind:object={formTemplate} bind:lang={lang} />
</div>