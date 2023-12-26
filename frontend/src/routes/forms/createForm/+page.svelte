<script lang="ts">
    import CreateForm from "$lib/components/CreateForm.svelte"
    import toast, { Toaster } from "svelte-french-toast"
    import LL from "../../../i18n/i18n-svelte"

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

    $: chooseLanguages = languages.filter(language => language.checked).map(language => language.name)
</script>

<svelte:head>
    <title>{$LL.FormButton()}</title>
</svelte:head>

<Toaster />

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-5">
    <div class="flex flex-row gap-x-4 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" height="100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <div class="flex flex-col gap-y-2">
            <h1 class="font-semibold text-xl">{ $LL.CreateFormModel() }</h1>
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
        <CreateForm bind:user={user} bind:languages={chooseLanguages} />
    {/if}
</div>