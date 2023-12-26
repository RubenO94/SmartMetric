<script lang="ts">
    import { api } from "$lib/api/_api"
    import { onMount } from "svelte"
    import ChooseReview from "$lib/components/ChooseReview.svelte"
    import CreateBlankReview from "$lib/components/CreateBlankReview.svelte"
    import CreateReviewWithForm from "$lib/components/CreateReviewWithForm.svelte"
    import LL from "../../../i18n/i18n-svelte"
    import toast from "svelte-french-toast"

    export let data

    let user = data.user
    let lang = data.lang[0].slice(0, 2).toUpperCase()
    let chooseForm: number = 0
    let currentStep: number = 1
    let page: number = 1
    let FormTemplates: FormTemplate[] = []
    let formTemplateChoose: FormTemplate
    let chooseLanguages: string[] = []
    let languages = [
        {name: 'PT', checked: false},
        {name: 'EN', checked: false},
        {name: 'ES', checked: false},
        {name: 'FR', checked: false},
        {name: 'PL', checked: false}
    ]

    function checkLanguages() {
        if (chooseLanguages.length < 1) {
            toast.error($LL.ErrorAddingLanguagesToForm())
            return
        } 
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

    async function getForms () {
        const [request] = await Promise.all([
            api('GET', `FormTemplates?page=${page}&pageSize=10`)
        ])
        FormTemplates = request?.body
    }

    onMount(() => { getForms() })

    $: formTemplateChoose = FormTemplates[0]
    $: chooseLanguages = languages.filter(language => language.checked).map(language => language.name)
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-5">
    {#if currentStep == 1}
        <ChooseReview bind:currentStep={currentStep} />
    {:else if currentStep == 2}
        <div class="flex flex-row gap-x-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" height="100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div class="flex flex-col gap-y-2">
                <h1 class="font-semibold text-xl">{ $LL.CreateBlankReview() }</h1>
                <p class="text-black text-sm">{ $LL.CreateBlankReviewDescription() }</p>
            </div>
        </div>

        {#if page == 1}
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
        {:else if page == 2}
            <CreateBlankReview {user} bind:languages={chooseLanguages} />
        {/if}
        
    {:else}
        <div class="flex flex-row gap-x-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" height="100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div class="flex flex-col gap-y-2">
                <h1 class="font-semibold text-xl">{ $LL.CopyFormModel() }</h1>
                <p class="text-black text-sm">{ $LL.CopyFormModelDescription() }</p>
            </div>
        </div>

        {#if chooseForm == 0}
            <div class="flex flex-col gap-y-10">
                <div class="flex flex-col gap-y-2">
                   <p class="text-black text-base font-semibold">Select form template to use:</p>
                    <select bind:value={formTemplateChoose} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                        {#each FormTemplates as formTemplate}
                            <option value="{formTemplate}">
                                Titulo: {formTemplate.translations[0].title} ({formTemplate.translations[0].language}), 
                                Data de criação: {(formTemplate.createdDate).split('T')[0]},
                                Nº Idiomas Disponiveis: {formTemplate.translations.length}
                            </option>
                        {/each}
                    </select> 
                </div>

                <button on:click={() => (chooseForm = chooseForm + 1)} class="text-lg font-semibold py-1 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">Continue</button>
            </div>
        {:else}
            <CreateReviewWithForm bind:questions={formTemplateChoose.questions} {user} {languages} />
        {/if}
    {/if}
</div>