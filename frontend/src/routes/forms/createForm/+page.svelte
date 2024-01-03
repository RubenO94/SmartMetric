<script lang="ts">
    import CreateForm from "$lib/components/CreateForm.svelte"
    import toast, { Toaster } from "svelte-french-toast"
    import LL from "../../../i18n/i18n-svelte"
    import { FilePlus } from "lucide-svelte";
    import FormComponent from "$lib/components/FormComponent.svelte";

    export let data

    let user = data.user
    let page: number = 0
    let chooseLanguages: string[] = []
    let languages = [
        {name: 'PT', checked: false},
        {name: 'EN', checked: false},
        {name: 'ES', checked: false},
        {name: 'FR', checked: false},
        {name: 'PL', checked: false}
    ]
    let formTemplate: FormTemplate = {
        createdByUserId: user.userId,
        translations: [],
        questions: [],
        formTemplateId: null,
        modifiedDate: null,
        createdDate: null
    }

    function checkLanguages() {
        if (chooseLanguages.length < 1) {
            toast.error($LL.ErrorAddingLanguagesToForm())
            return
        }
        chooseLanguages.forEach((lang: string) => {
            formTemplate.translations = [...formTemplate.translations, {language: lang, title: '', description: ''}]
        })
        page++
    }

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

    $: chooseLanguages = languages.filter(language => language.checked).map(language => language.name)
</script>

<svelte:head>
    <title>{$LL.FormButton()}</title>
</svelte:head>

<Toaster />

<div class="mx-auto flex flex-col xl:w-[900px] w-screen p-5 gap-y-5">
    <div class="flex flex-col md:flex-row gap-x-4 items-center text-blue-500">
        <div class="block">
            <svelte:component this={FilePlus} size="90" />
        </div>
        <div class="flex flex-col gap-y-2">
            <h1 class="text-center md:text-left font-semibold text-xl">{ $LL.CreateFormModel() }</h1>
            <p class="text-black text-sm">{ $LL.CreateFormModelDescription() }</p>
        </div>
    </div>

    {#if page == 0}
        <p>Select languages to create form:</p>
        <div class="flex flex-col gap-y-2">
            {#each languages as language}
                <button class="flex items-center cursor-pointer mr-auto" on:click={() => {language.checked = !language.checked}}>
                    <input bind:checked={language.checked} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <p class="ms-2 text-sm font-medium text-gray-900">{showLanguageTranslation(language.name)}</p>
                </button>
            {/each}
        </div>
        <button on:click={() => checkLanguages()} class="flex gap-x-2 mx-auto text-base font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">Create form</button>
    {:else if page == 1}
        <!-- <CreateForm {user} bind:languages={chooseLanguages} /> -->
        <FormComponent {formTemplate} />
    {/if}
</div>