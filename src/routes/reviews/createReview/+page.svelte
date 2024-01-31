<script lang="ts">
    import { api } from "$lib/api/_api"
    import { onMount } from "svelte"
    import LL from "../../../i18n/i18n-svelte"
    import toast, { Toaster } from "svelte-french-toast"
    import ChooseReview from "$lib/components/ChooseReview.svelte"
    import ReviewComponent from "$lib/components/ReviewComponent.svelte"

    export let data

    let user = data.user
    let departments = data.departments
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
    let action = 'create'
    let review: Reviews = {
        createdByUserId: user!.userId,
        translations: [],
        questions: [],
        reviewId: null,
        createdDate: null,
        startDate: null,
        endDate: null,
        reviewType: "",
        reviewStatus: "NotStarted",
        reviewDepartmentsIds: [],
        reviewEmployeesIds: [],
        employees: null,
        departments: null
    }

    function checkLanguages() {
        if (chooseLanguages.length < 1) {
            toast.error($LL.ErrorAddingLanguagesToForm())
            return
        }
        chooseLanguages.forEach((lang: string) => {
            review.translations = [...review.translations, {language: lang, title: '', description: ''}]
        })
        if (currentStep == 3) {
            // Copy the structure from formTemplateChoose to review
            review.questions = formTemplateChoose.questions.map(originalQuestion => {
                //Create a copy of the original question
                var newQuestion = { ...originalQuestion }

                // Filter translations for the question itself
                newQuestion.translations = originalQuestion.translations.filter(translation => chooseLanguages.includes(translation.language))

                // Filter translations for ratingOptions
                newQuestion.ratingOptions = originalQuestion.ratingOptions.map(originalRatingOption => {
                    var newRatingOption = {...originalRatingOption}
                    newRatingOption.translations = originalRatingOption.translations.filter(rtot => chooseLanguages.includes(rtot.language))
                    return newRatingOption
                })

                // Filter translations for singleChoiceOptions
                newQuestion.singleChoiceOptions = originalQuestion.singleChoiceOptions.map(originalSingleChoiceOption => {
                    var newSingleChoiceOption = {...originalSingleChoiceOption}
                    newSingleChoiceOption.translations = originalSingleChoiceOption.translations.filter(scot => chooseLanguages.includes(scot.language))
                    return newSingleChoiceOption
                })

                return newQuestion
            })
            console.log(review)
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

    function goNext() {
        if (formTemplateChoose.translations.length == 1) {
            review.translations = [...review.translations, {language: formTemplateChoose.translations[0].language, title: '', description: ''}]
            review.questions = formTemplateChoose.questions
            page = page + 2
        } else {
            languages = languages.filter(language => formTemplateChoose.translations.some(obj => obj.language == language.name))
            page++
        }
    }

    async function getForms () {
        const [request] = await Promise.all([
            api('GET', `FormTemplates?page=${page}&pageSize=10`)
        ])
        FormTemplates = request?.body
    }

    onMount(() => { 
        getForms()
        formTemplateChoose = FormTemplates[0]
    })

    $: chooseLanguages = languages.filter(language => language.checked).map(language => language.name)
    console.log(departments)
</script>

<Toaster />

<div class="mx-auto flex flex-col xl:w-[1280px] p-10 gap-y-5">
    {#if currentStep == 1}
        <ChooseReview bind:currentStep={currentStep} />
    {:else if currentStep == 2}
        <div class="flex gap-x-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" height="100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div class="flex flex-col gap-y-2">
                <h1 class="font-semibold text-xl">{ $LL.CreateBlankReview() }</h1>
                <p class="text-black text-sm">{ $LL.CreateBlankReviewDescription() }</p>
            </div>
        </div>

        {#if page == 1}
            <p>{$LL.SelectLangs()}</p>
            <div class="flex flex-col gap-y-2">
                {#each languages as language}
                    <button class="flex items-center cursor-pointer mr-auto" on:click={() => {language.checked = !language.checked}}>
                        <input bind:checked={language.checked} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer">
                        <p class="ms-2 text-sm font-medium text-gray-900">{showLanguageTranslation(language.name)}</p>
                    </button>
                {/each}
            </div>
            <button on:click={() => checkLanguages()} class="flex gap-x-2 mx-auto text-base font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">Create form</button>
        {:else if page == 2}
            <ReviewComponent {review} {action} addLangs={[]} {departments} />
        {/if}
    {:else if currentStep == 3}
        <div class="flex flex-row gap-x-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" height="100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <div class="flex flex-col gap-y-2">
                <h1 class="font-semibold text-xl">{ $LL.CopyFormModel() }</h1>
                <p class="text-black text-sm">{ $LL.CopyFormModelDescription() }</p>
            </div>
        </div>

        {#if page == 1}
            <div class="flex flex-col gap-y-10">
                <div class="flex flex-col gap-y-2">
                   <p class="text-black text-base font-semibold">{$LL.SelectFormTemplate()}</p>
                    <select bind:value={formTemplateChoose} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                        {#each FormTemplates as formTemplate}
                            <option value="{formTemplate}">
                                {$LL.Title()}: {formTemplate.translations[0].title} ({formTemplate.translations[0].language}), 
                                {$LL.CreationDate()}: {(formTemplate.createdDate).split('T')[0]},
                                {$LL.AvailableLangs()}: {formTemplate.translations.length}
                            </option>
                        {/each}
                    </select> 
                </div>

                <button on:click={() => goNext()} class="text-lg font-semibold py-1 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">{$LL.Continue()}</button>
            </div>
        {:else if page == 2}
            <p>{$LL.SelectLangsReview()}</p>
            <div class="flex flex-col gap-y-2">
                {#each languages as language}
                    <button class="flex items-center cursor-pointer mr-auto" on:click={() => {language.checked = !language.checked}}>
                        <input bind:checked={language.checked} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer">
                        <p class="ms-2 text-sm font-medium text-gray-900">{showLanguageTranslation(language.name)}</p>
                    </button>
                {/each}
            </div>
            <button on:click={() => checkLanguages()} class="flex gap-x-2 mx-auto text-base font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">{$LL.FormButton()}</button>
        {:else if page == 3}
            <ReviewComponent {review} {action} addLangs={[]} {departments} />
        {/if}
    {/if}
</div>