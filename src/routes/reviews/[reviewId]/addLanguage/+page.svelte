<script lang="ts">
    import LL from "../../../../i18n/i18n-svelte"
    import ReviewComponent from "$lib/components/ReviewComponent.svelte"
    import { FileEdit } from "lucide-svelte"
    import toast from "svelte-french-toast";

    export let data

    let review: Reviews = data.review
    let page = 0
    let addLangs: string[] = []
    let action = 'add'
    let languages = [
        {name: 'PT', checked: false},
        {name: 'EN', checked: false},
        {name: 'ES', checked: false},
        {name: 'FR', checked: false},
        {name: 'PL', checked: false}
    ]

    languages = languages.filter(language => !review.translations.some((trans: any) => trans.language === language.name))
    review.reviewDepartmentsIds = review.departments!.map(department => department.departmentId)
    review.reviewEmployeesIds = review.employees!.map(employee => employee.employeeId)
    review.departments = []
    review.employees = []

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

    function checkLanguages() {
        if (addLangs.length < 1) {
            toast.error($LL.ErrorAddingLanguagesToForm())
            return
        }
        addLangs.forEach((lang: string) => {
            review.translations = [...review.translations, {language: lang, title: '', description: ''}]
        })
        page++
    }

    $: addLangs = languages.filter(language => language.checked).map(language => language.name)
</script>

<svelte:head>
    <title>{$LL.AddLanguage()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-5">
    <div class="flex flex-col md:flex-row gap-x-4 items-center text-blue-500">
        <div class="block">
            <svelte:component this={FileEdit} size="90" />
        </div>
        <div class="flex flex-col gap-y-2">
            <h1 class="text-center md:text-left font-semibold text-lg md:text-xl">{ $LL.EditReview() }</h1>
            <p class="text-black text-xs md:text-sm">{ $LL.EditReviewDescription() }</p>
        </div>
    </div>

    {#if page == 0}
        <div class="flex flex-col gap-y-2">
            {#each languages as language}
                <button class="flex items-center cursor-pointer mr-auto" on:click={() => {language.checked = !language.checked}}>
                    <input bind:checked={language.checked} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <p class="ms-2 text-sm font-medium text-gray-900">{showLanguageTranslation(language.name)}</p>
                </button>
            {/each}
            <button on:click={checkLanguages} class="flex gap-x-2 mx-auto text-base font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">{$LL.AddLanguage()}</button>
        </div>
    {:else if page == 1}
        <ReviewComponent {review} {action} {addLangs} />
    {/if}
</div>