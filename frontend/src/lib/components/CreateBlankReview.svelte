<script lang="ts">
    import dayjs from 'dayjs'
    import LL from "../../i18n/i18n-svelte"
    import toast, { Toaster } from 'svelte-french-toast'
    import { api_token, api_url } from '$lib/stores/url'
    import { draggable } from '$lib/actions/dnd'
    import { fade, fly } from 'svelte/transition'
    import { goto } from "$app/navigation"
    import { Steps } from 'svelte-steps'
    import { api } from '$lib/api/_api'
    import { onMount } from 'svelte'
    import { DateInput } from 'date-picker-svelte'
    import InfiniteScroll from './InfiniteScroll.svelte'
    import { handleValidationsForm } from '$lib/actions/handleValidations';

    export let user
    export let languages

    let departments: Departments[] = []
    let newBatch: Departments[] = []
    let page: number = 1
    let currentStep: number = 0
    let saveAsForm: boolean = false
    let apiUrl: string
    let token: string
    let questions: Question[] = []
    let selectedQuestion: Question
    let insertedSingleChoiceOption: string = '' 
    let insertedNumericValue: number | null = null
    let insertedTitle: string = ''
    let review: Reviews = {
        createdByUserId: user.userId,
        startDate: null,
        endDate: null,
        reviewType: '',
        reviewStatus: 'NotStarted',
        translations: [],
        questions: [],
        reviewDepartmentsIds: []
    }
    let formTemplate: FormTemplate = {
        createdByUserId: review.createdByUserId,
        translations: [],
        questions: review.questions,
        formTemplateId: null,
        modifiedDate: null,
        createdDate: undefined
    }
    let steps = [
        { text: $LL.Details() }, 
        { text: $LL.Departments() }, 
        { text: $LL.Questions() }, 
        { text: $LL.Finalize() }
    ]
    let typeOfReview = [
        { name: $LL.TopDown.Label(), text: $LL.TopDown.Text(), value: "TopDown" }, 
        { name: $LL.BottomUp.Label(), text: $LL.BottomUp.Text(), value: "BottomUp" }, 
        { name: $LL.SelfEvaluation.Label(), text: $LL.SelfEvaluation.Text(), value: "SelfEvaluation" }, 
        { name: $LL.Interdepartmental.Label(), text: $LL.Interdepartmental.Text(), value: "Interdepartamental" }
    ]
    let cards = [
        { id: 1, title: $LL.QuestionType.Text(), name: 'Text' },
        { id: 2, title: $LL.QuestionType.SingleChoice(), name: 'SingleChoice' },
        { id: 3, title: $LL.QuestionType.Rating(), name: 'Rating' }
    ]
    let icons = [
        "M3 3h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3zm0 4h18v2H3z",
        "m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2",
        "M14 17h-2V9h-2V7h4m5-4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"
    ]

    languages.forEach((element: string) => {
        review.translations = [...review.translations, {language: element, title: '', description: ''}]
        formTemplate.translations = [...formTemplate.translations, {language: element, title: '', description: ''}]
    })
    let chooseLanguage: string = review.translations[0].language

    // Scroll Departments ---------------------------------------------------------------------------------------------------------------
    async function fetchData() {
        const [response] = await Promise.all([
            api ('GET', `Departments?page=${page}&pageSize=10`)
        ])
        newBatch = response?.body
        newBatch.forEach((department) => {
            department.checked = false
        })
        departments = [...departments, ...newBatch]
    }

    onMount(() => { fetchData() })
    // ----------------------------------------------------------------------------------------------------------------------------------

    //Store
    api_url.subscribe((value) => { apiUrl = value })
    api_token.subscribe((value) => { token = value })

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

    //Functions for Drop questionType and create question
    function allowDrop(event: DragEvent) { event.preventDefault() } 
    function handleDrop(event: DragEvent) {
        event.preventDefault()
        const cardId = event.dataTransfer?.getData('text/plain')
        const selectedCard = cards.find(card => card.id.toString() === cardId)

        if (selectedCard) {
            const newQuestion: Question = {
                isRequired: false,
                position: questions.length + 1,
                responseType: selectedCard.name,
                translations: [],
                singleChoiceOptions: [],
                ratingOptions: []
            }
            review.translations.forEach(element => {
                newQuestion.translations = [...newQuestion.translations, {language: element.language, title: '', description: ''}]
            });

            questions = [...questions, newQuestion]
            selectedQuestion = newQuestion
        }
    }

    //Function to remove question
    function removeQuestion(event: Event, index: number): void {
        questions = questions.filter((question) => question.position - 1 !== index)
        questions.forEach((question, index) => question.position = index + 1)
        if (selectedQuestion && selectedQuestion.position - 1 == index) {
            selectedQuestion = {
                isRequired: false,
                position: -1,
                responseType: "",
                translations: [],
                singleChoiceOptions: [],
                ratingOptions: []
            }
        }
        event.stopPropagation()
    }

    //Function to select question to edit
    function selectQuestion(question: Question) {
        selectedQuestion = question
    }

    //Function to update question
    function updateQuestion(question: Question) {
        let position = question.position
        questions[position - 1] = selectedQuestion
    }

    //Function to add single choice option
    function addSingleChoiceOption(insertedOption: string): void {
        insertedSingleChoiceOption = ''
        if (insertedOption == '' || insertedOption == null) { 
            toast.error($LL.AddSingleChoiceOptionError())
            return
        }
        let singleChoiceOption: SingleChoiceOption = {translations: []}
        review.translations.forEach(element => {
            singleChoiceOption.translations = [...singleChoiceOption.translations, {language: element.language, title: '', description: insertedOption}]
        })
        selectedQuestion.singleChoiceOptions = [...selectedQuestion.singleChoiceOptions, singleChoiceOption]
        updateQuestion(selectedQuestion)
    }

    //Function to add rating option
    function addRatingOption(numericValue: number | null, title: string): void {
        let conditionIsTrue = false
        insertedNumericValue = null
        insertedTitle = ''
        if (numericValue == 0 || numericValue == null || title == null || title == '') {
            toast.error($LL.AddRatingOptionError01())
            return
        }
        selectedQuestion.ratingOptions.forEach(element => {
            if (element.numericValue == numericValue) {
                conditionIsTrue = true
                toast.error($LL.AddRatingOptionError02())
                return
            }
        })
        if (conditionIsTrue) return
        let ratingOption: RatingOption = {numericValue: numericValue, translations: []}
        review.translations.forEach(element => {
            ratingOption.translations = [...ratingOption.translations, {language: element.language, title: '', description: title}]
        })
        selectedQuestion.ratingOptions = [...selectedQuestion.ratingOptions, ratingOption]
        updateQuestion(selectedQuestion)
    }

    //Function to delete option (optionType == 1 is sco, optionType == 2 is rto)
    function removeOption(index: number, optionType: number): void {
        if (optionType == 1) {
            selectedQuestion.singleChoiceOptions = selectedQuestion.singleChoiceOptions.filter((_, i) => i !== index)
        } else {
            selectedQuestion.ratingOptions = selectedQuestion.ratingOptions.filter((_, i) => i !== index)
        }
        updateQuestion(selectedQuestion)
    }

    async function saveReview() {
        const [request] = await Promise.all([ api("POST", "Reviews", review) ])
        const response: any = request
        console.log(response)

        if (response.status == 201) {
            toast.success($LL.FormTemplateSuccess())
            goto('/reviews')
        } else if (response.error === '$.reviewType') {
            toast.error($LL.ErrorsReview.ReviewType())
        } else if (response.error === 'Questions') {
            toast.error($LL.ErrorsReview.Question())
        } else if (response.error === 'Translations[0].Title') {
            toast.error($LL.ErrorsReview.Title())
        } else if (response.error === 'ReviewDepartmentsIds') {
            toast.error($LL.ErrorsReview.Departments())
        } else {
            toast.error($LL.ErrorsReview.Others())
        }
        document.getElementById('buttonGoForward')?.removeAttribute("disabled")
    }

    //Function to save Form Template
    async function saveFormTemplate () {
        const [formValid, error] = handleValidationsForm(formTemplate, 0)
        if (!formValid) {
            toast.error(error)
            return
        }
        const [requestFormTemplate] = await Promise.all([ api("POST", "FormTemplates", formTemplate) ])
        const responseFormTemplate: any = requestFormTemplate
        if (!responseFormTemplate.error) {
            saveReview()
        }
        console.log(responseFormTemplate)
    }

    function hideDialog() {
        let dialog = document.getElementById('dialog');
        setTimeout(() => {
            dialog?.classList.add('hidden');
        }, 100);
        document.getElementById('buttonGoForward')?.removeAttribute("disabled")
    }

    //buttons of stepper
    const handleStepBackward = (event: Event) => {
        if (currentStep != 0) currentStep -= 1
    }
    const handleStepForward = async (event: Event) => { 
        if (currentStep != steps.length - 1) currentStep += 1
        else {
            document.getElementById('buttonGoForward')?.setAttribute("disabled", "disabled")
            if (saveAsForm) {
                let dialog = document.getElementById('dialog')
                dialog?.classList.remove('hidden')
            } else {
                saveReview()
            }
        }
    }

    //Everytime variable questions changes, formTemplate.questions is gonna change too
    $: review.questions = questions
    $: review.reviewStatus = review.endDate != null ? 'Active' : 'NotStarted'
    $: review.startDate = review.endDate != null ? dayjs(new Date()).format('YYYY-MM-DDThh:mm:ss') : null
    $: review.reviewDepartmentsIds = departments.filter(department => department.checked).map(department => department.departmentId)
    $: formTemplate.questions = review.questions
</script>

<Toaster />

<div class="flex flex-col text-gray-400 text-xs gap-y-16">
    <Steps clickable={true} {steps} size="2.3em" bind:current={currentStep} />

    {#if currentStep == 0}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-row gap-x-5 items-center">
                <p class="text-black text-base font-semibold flex-shrink-0">{$LL.ChooseLanguage()}</p>
                <select bind:value={chooseLanguage} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                    {#each review.translations as translation}
                        <option value={translation.language}>{showLanguageTranslation(translation.language)}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewTitleTitle()}</p>
                <p>{$LL.ReviewTitleDescription()}</p>
                {#each review.translations as translation}
                    {#if translation.language == chooseLanguage}
                        <input name="titleForm" class="w-auto my-1 p-2 text-black border rounded" bind:value={translation.title} />
                    {/if}
                {/each}
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewDescriptionTitle()}</p>
                <p>{$LL.ReviewDescriptionDescription()}</p>
                {#each review.translations as translation}
                    {#if translation.language == chooseLanguage}
                        <textarea name="descriptionForm" rows="8" class="w-auto my-1 p-2 text-black border rounded" bind:value={translation.description}></textarea>
                    {/if}
                {/each}
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewTypeTitle()}</p>
                <p>{$LL.ReviewTypeDescription()}</p>
                <div class="flex flex-col gap-2 mt-2">
                    {#each typeOfReview as type}
                        <div class="flex">
                            <input id="{type.name}" type="radio" name="radio-group" value="{type.value}" bind:group={review.reviewType} class="h-5 w-5 cursor-pointer" />
                            <label for="{type.name}" class="flex gap-x-1 pl-2 cursor-pointer">
                                <p class="text-gray-600 font-semibold">{type.name}:</p>
                                <p>{type.text}</p>
                            </label>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {:else if currentStep == 1}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-col gap-y-5">
                <div class="flex flex-col gap-y-1">
                    <p class="text-black text-base font-semibold">{$LL.SelectDepartmentsLabel()}</p>
                    <p>{$LL.SelectDepartmentsText()}</p>
                </div>
                
                <!-- <div class="flex flex-col bg-gray-100 border border-gray-300 px-4 py-5 gap-y-2 rounded"> -->
                <ul>
                    {#each departments as department}
                        {#if department.departmentParentId == 0}    
                            <li on:click={() => {department.checked = !department.checked}} class="cursor-pointer">
                                <div class="text-gray-600 flex items-center font-medium gap-x-2">
                                    <input bind:checked={department.checked} type="checkbox" class="accent-blue-500 w-5 h-5" />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20zm7-3h8v-.55q0-1.125-1.1-1.787T15 14q-1.8 0-2.9.663T11 16.45zm4-4q.825 0 1.413-.587T17 11q0-.825-.587-1.412T15 9q-.825 0-1.412.588T13 11q0 .825.588 1.413T15 13"/></svg>
                                    <p>{department.departmentDescription}</p>
                                </div>
                            </li>
                        {/if}
                    {/each}
                    <InfiniteScroll hasMore={newBatch.length} threshold={100} on:loadMore={() => {page++; fetchData()}} />
                </ul>
            </div>
        </div>
    {:else if currentStep == 2}
        <div class="flex flex-row gap-x-10">
            <div class="flex flex-col gap-y-2">
                <p class="text-black text-base font-semibold">{$LL.QuestionTypeText()}</p>
                <div class="flex flex-col gap-y-2">
                    {#each cards as card, index}
                        <p use:draggable={card.id} class="flex items-center gap-x-2 p-2 font-bold border bg-gray-100 text-gray-600 border-gray-200 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="{icons[index]}"/>
                            </svg>
                            {card.title}
                        </p>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col gap-y-2 w-2/4">
                <p class="text-black text-base font-semibold">{$LL.FormPreview()}</p>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="bg-gray-100 min-h-[250px] h-full flex flex-col gap-y-2 shadow-lg rounded-lg p-5 border border-gray-200" on:drop="{handleDrop}" on:dragover="{allowDrop}">
                    <div class="flex flex-row gap-x-5 items-center">
                        <p class="text-black text-sm font-semibold flex-shrink-0">{$LL.ChooseLanguage()}</p>
                        <select bind:value={chooseLanguage} class="bg-white border border-gray-300 text-gray-900 text-xs rounded-lg shadow focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                            {#each review.translations as translation}
                                <option value={translation.language}>{showLanguageTranslation(translation.language)}</option>
                            {/each}
                        </select>
                    </div>
                    {#if questions.length == 0}
                        <p>{$LL.FormPreviewPlaceholder()}</p>
                    {/if}
                    {#each questions as question, index}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div in:fade={{ duration: 500 }} out:fly={{ y: -200, duration: 500 }} id="questionsAdded" class="group bg-white flex flex-col gap-y-5 px-2 py-4 rounded border border-transparent cursor-pointer hover:border-blue-500 relative" on:click={() => selectQuestion(question)}>
                            <button class="hidden group-hover:flex absolute top-0 right-0 p-2" on:click={(event) => removeQuestion(event, index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div class="flex flex-row gap-x-2">
                                <p class="text-blue-500 font-extrabold">Q{question.position}</p>
                                <div class="flex flex-col gap-y-1">
                                    {#each question.translations as translation}
                                        {#if translation.language == chooseLanguage}
                                            <p class="text-black font-bold">{translation.title}</p>
                                            <p>{translation.description}</p>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                            {#if question.responseType === 'Rating' }
                                {#if question.ratingOptions.length == 0}
                                    <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                        <p>{$LL.FormPreviewRatingPlaceholder()}</p>
                                    </div>
                                {:else}
                                    <div class="flex gap-x-1">
                                        {#each question.ratingOptions as rating}
                                            <div class="flex flex-col gap-y-1 items-center">
                                                <div class="bg-gray-100 p-5 rounded-full"></div>
                                                <p>{rating.numericValue}</p>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            {:else if question.responseType === 'SingleChoice' }
                                {#if question.singleChoiceOptions.length == 0}
                                    <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                        <p>{$LL.FormPreviewSingleChoicePlaceholder()}</p>
                                    </div>
                                {:else}
                                    <div class="flex flex-col gap-y-1">
                                        {#each question.singleChoiceOptions as singleChoice}
                                            <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                                {#each singleChoice.translations as translation}
                                                    {#if translation.language == chooseLanguage}
                                                        <p>{translation.description}</p>
                                                    {/if}
                                                {/each}
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            {:else}
                                <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                    <p>{$LL.Answer()}</p>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col gap-y-2 flex-grow">
                <p class="text-black text-base font-semibold">{$LL.QuestionProperties()}</p>
                <div class="bg-gray-100 flex flex-col h-full gap-y-10 shadow-lg rounded-lg p-5 border border-gray-200">
                    {#if selectedQuestion && selectedQuestion.position !== -1}
                        <div class="flex gap-x-2">
                            <p class="text-blue-500 font-extrabold text-base">Q{selectedQuestion.position}</p>
                            {#each selectedQuestion.translations as translation, index}
                                {#if translation.language == chooseLanguage}
                                    <p class="text-black font-semibold text-base">{selectedQuestion.translations[index].title}</p>
                                {/if}
                            {/each}
                        </div>
                        <div class="flex flex-col gap-y-5">
                            <div class="flex gap-x-2">
                                <p class="text-black text-sm font-semibold">{$LL.Required()}</p>
                                <label class="toggle">
                                    <input type="checkbox" checked="{selectedQuestion.isRequired}" on:change={() => selectedQuestion.isRequired = !selectedQuestion.isRequired}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-black text-sm font-semibold">{$LL.Title()}</p>
                                {#each selectedQuestion.translations as translation, index}
                                    {#if translation.language == chooseLanguage}
                                        <input class="text-black p-2 rounded" placeholder={$LL.Title()} bind:value={selectedQuestion.translations[index].title} on:blur={() => updateQuestion(selectedQuestion)} />
                                    {/if}
                                {/each}
                            </div>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-black text-sm font-semibold">{$LL.Description()}</p>
                                {#each selectedQuestion.translations as translation, index}
                                    {#if translation.language == chooseLanguage}
                                        <textarea class="text-black p-2 rounded" placeholder={$LL.Description()} bind:value={selectedQuestion.translations[index].description} on:blur={() => updateQuestion(selectedQuestion)} rows="5"></textarea>
                                    {/if}
                                {/each}
                            </div>
                            {#if selectedQuestion.responseType == 'Rating'}
                                <div class="flex flex-col gap-y-1">
                                    <p class="text-black text-sm font-semibold">{$LL.Answers()}</p>
                                    <div class="flex flex-col justify-center gap-y-1">
                                        {#each selectedQuestion.ratingOptions as option, index}
                                            <div class="flex gap-x-2">
                                                {#each option.translations as translation, index}
                                                    {#if translation.language == chooseLanguage}
                                                        <input class="bg-white p-2 text-black rounded flex-grow" bind:value={translation.description} on:blur={() => updateQuestion(selectedQuestion)} />
                                                    {/if}
                                                {/each}
                                                <button on:click={() => removeOption(index, 2)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-black">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>  
                                                </button>
                                            </div>
                                        {/each}
                                        <div class="flex gap-x-2">
                                            <input id="numericValueRatingOption" type="number" pattern="[0-9]*" class="bg-white w-[70px] p-2 text-black border border-dashed border-gray-500 rounded" bind:value={insertedNumericValue} placeholder={$LL.Numeric()} />
                                            <input id="titleRatingOption" class="bg-white p-2 text-black border border-dashed border-gray-500 rounded flex-grow" bind:value={insertedTitle} placeholder={$LL.AddOption()} />
                                            <button on:click={() => addRatingOption(insertedNumericValue, insertedTitle)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500 hover:bg-blue-100 rounded-full">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {:else if selectedQuestion.responseType == 'SingleChoice'}
                                <div class="flex flex-col gap-y-1">
                                    <p class="text-black text-sm font-semibold">{$LL.Answers()}</p>
                                    <div class="flex flex-col justify-center gap-y-1">
                                        {#each selectedQuestion.singleChoiceOptions as option, index}
                                            <div class="flex gap-x-2">
                                                {#each option.translations as translation, i}
                                                    {#if translation.language == chooseLanguage}
                                                        <input class="bg-white p-2 text-black border border-gray-500 rounded flex-grow" bind:value={option.translations[i].description} on:blur={() => updateQuestion(selectedQuestion)} />
                                                    {/if}
                                                {/each}
                                                <button on:click={() => removeOption(index, 1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-black">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        {/each}
                                        <div class="flex gap-x-2">
                                            <input class="bg-white p-2 text-black border border-dashed border-gray-500 rounded flex-grow" bind:value={insertedSingleChoiceOption} placeholder={$LL.AddOption()} />
                                            <button on:click={() => addSingleChoiceOption(insertedSingleChoiceOption)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500 hover:bg-blue-100 rounded-full">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {:else}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.SaveReviewAsForm()}</p>
                <p>{$LL.SaveReviewAsFormDesc()}</p>
                <div class="flex items-center m-5">
                    <input on:click={() => saveAsForm = !saveAsForm} checked={saveAsForm} id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-600">{$LL.Save()}</label>
                </div>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.StartAndEndDateText()}</p>
                <p>{$LL.StartAndEndDateDesc()}</p>
                <div class="flex items-center m-5 gap-x-10">
                    <div class="flex flex-col gap-y-2">
                        <p class="text-sm font-medium text-gray-600">{$LL.EndDate()}</p>
                        <DateInput bind:value={review.endDate} placeholder="" closeOnSelection />
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <!-- Buttons of Stepper -->
    <div class="flex justify-between mt-10">
        <!-- Go Back button -->
        <button on:click={handleStepBackward} class="flex gap-x-2 text-lg font-semibold px-5 py-2 border border-transparent hover:bg-gray-100 rounded" id="buttonGoBack">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg> 
            {$LL.Return()}
        </button>
        <!-- Go Next button -->
        <button on:click={handleStepForward} type="submit" class="flex gap-x-2 text-lg font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded" id="buttonGoForward" value="Submit">
            {#if currentStep != steps.length - 1}
                {$LL.Forward()}
            {:else}
                {$LL.Finalize()}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    </div>
</div>

<!-- DIALOG -->
<div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5 flex flex-col gap-y-5">
        <div class="flex items-center gap-5">
            <div class="bg-blue-200 text-blue-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>                                     
                </p>                                                                               
            </div>
            <div>
                <h1 class="font-bold text-xl mb-2">{$LL.SaveReviewAsFormDialog()}</h1>
                <p class="text-gray-400 text-sm">{$LL.SaveReviewAsFormDescDialog()}</p>
            </div>
        </div>
        <div class="flex gap-x-2 items-center">
            <p>{$LL.ChooseLanguage()}</p>
            <select bind:value={chooseLanguage} class="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                {#each formTemplate.translations as translation}
                    <option value={translation.language}>{showLanguageTranslation(translation.language)}</option>
                {/each}
            </select>
        </div>
        <div class="flex flex-col gap-y-1">
            <p>{$LL.FormModelTitleTitle()}</p>
            {#each formTemplate.translations as translation}
                {#if translation.language == chooseLanguage}
                    <input bind:value={translation.title} class="p-2 text-sm border border-gray-300 bg-gray-100 rounded" />
                {/if}
            {/each}
        </div>
        <div class="flex flex-col gap-y-1">
            <p>{$LL.FormModelDescriptionTitle()}</p>
            {#each formTemplate.translations as translation}
                {#if translation.language == chooseLanguage}
                    <textarea bind:value={translation.description} rows="4" class="p-2 text-sm border border-gray-300 bg-gray-100 rounded"></textarea>
                {/if}
            {/each}
        </div>
        <div class="flex justify-end gap-4 mt-5">
            <button class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200" on:click={hideDialog}>{$LL.Cancel()}</button>
            <button class="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-700" on:click="{saveFormTemplate}">{$LL.SaveAsForm()}</button>
        </div>
    </div>
</div>

<style>
    .toggle {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 22px;
    }
         
    /* Hide the checkbox input */
    .toggle input {
        display: none;
    }
         
    /* Describe slider's look and position. */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: gray;
        transition: .4s;
        border-radius: 34px;
    }
         
    /* Describe the white ball's location and appearance in the slider. */
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
         
    /* Modify the slider's background color to green once the checkbox has been selected. */
    input:checked+.slider {
        background-color: #3B82F6;
    }
         
    /* When the checkbox is checked, shift the white ball towards the right within the slider. */
    input:checked+.slider:before {
        transform: translateX(14px);
    }

    ul {
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        width: 100%;
        max-height: 325px;
        --tw-bg-opacity: 1;
        background-color: rgb(243 244 246 / var(--tw-bg-opacity));
        overflow-x: hidden;
        list-style: none;
        padding: 0;
    }

    li {
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s all;
        font-size: 14px;
        color: black;
    }

    li:hover {
        --tw-bg-opacity: 1;
        background-color: rgb(209 213 219 / var(--tw-bg-opacity));
    }
</style>