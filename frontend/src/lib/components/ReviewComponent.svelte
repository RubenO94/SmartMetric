<script lang="ts">
    import { api } from "$lib/api/_api"
    import { goto } from "$app/navigation"
    import { Steps } from "svelte-steps"
    import { ChevronLeft, ChevronRight, X, Square, Folder, FolderOpen, User } from 'lucide-svelte'
    import { handleValidationsReview } from '$lib/actions/handleValidations'
    import { draggable } from "$lib/actions/dnd"
    import { fade, fly } from "svelte/transition"
    import { DateInput } from 'date-picker-svelte'
    import dayjs from "dayjs"
    import LL from "../../i18n/i18n-svelte"
    import toast from "svelte-french-toast"

    export let review: Reviews
    export let action: string
    export let addLangs: string[]
    export let departments: any[]

    let selectedQuestion: Question
    let insertedSingleChoiceOption: string = ''
    let insertedNumericValue: number | null
    let insertedTitle: string = ''
    let saveAsForm: boolean = false
    let maxDateAllowed = new Date()
    let current = 0
    let chooseLanguage = review.translations[0].language
    let openMenu: boolean[] = []
    let steps = [
        { text: $LL.Details() },
        { text: $LL.Departments() },
        { text: $LL.Questions() },
        { text: $LL.Finalize() }
    ]
    let cards = [
        { id: 1, title: $LL.QuestionType.Text(), name: 'Text', icon: "M3 3h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3zm0 4h18v2H3z" },
        { id: 2, title: $LL.QuestionType.SingleChoice(), name: 'SingleChoice', icon: "m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" },
        { id: 3, title: $LL.QuestionType.Rating(), name: 'Rating', icon: "M14 17h-2V9h-2V7h4m5-4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" }
    ]
    let typeOfReview = [
        { name: $LL.TopDown.Label(), text: $LL.TopDown.Text(), value: "TopDown" }, 
        { name: $LL.BottomUp.Label(), text: $LL.BottomUp.Text(), value: "BottomUp" }, 
        { name: $LL.SelfEvaluation.Label(), text: $LL.SelfEvaluation.Text(), value: "SelfEvaluation" }, 
        { name: $LL.Interdepartmental.Label(), text: $LL.Interdepartmental.Text(), value: "Interdepartamental" }
    ]

    review.questions.forEach((question) => {
        addLangs.forEach((lang) => {
            question.translations = [...question.translations, {language: lang, title: '', description: ''}]
            if (question.responseType == 'Rating') {
                question.ratingOptions.forEach((rto) => {
                    rto.translations = [...rto.translations, {language: lang, title: '', description: ''}]
                })
            } else if (question.responseType == 'SingleChoice') {
                question.singleChoiceOptions.forEach((sco) => {
                    sco.translations = [...sco.translations, {language: lang, title: '', description: ''}]
                })
            }
        })
    })

    maxDateAllowed.setFullYear(maxDateAllowed.getFullYear() + 5)

    departments.forEach(department => {
        department.employees = []
    })

    async function saveReview() {
        let request: any
        if (action == 'create') {
            [request] = await Promise.all([api("POST", `Reviews`, review)])
        } else {
            [request] = await Promise.all([api("PUT", `Reviews/${review.reviewId}`, review)])
        }

        if (request.status == 200 || request.status == 201) {
            toast.success(request.status == 201 ? $LL.ReviewSuccess() : $LL.EditReviewMessage())
            goto('/reviews')
        } else {
            toast.error($LL.ErrorsReview.SomethingWrong())
        }
    }

    const handleStepBackward = (event: Event) => {
        if (current != 0) current -= 1
    }
    const handleStepForward = (event: Event) => {
        let [validationForm, message] = handleValidationsReview(review, current)
        if (!validationForm) {
            switch (message) {
                case 'title':
                    toast.error($LL.ErrorsReview.Title())
                    break
                case 'reviewType':
                    toast.error($LL.ErrorsReview.ReviewType())
                    break
                case 'question':
                    toast.error($LL.ErrorsReview.Question())
                    break
                case 'questionTitle':
                    toast.error($LL.ErrorsReview.QuestionTitle())
                    break
                case 'departments':
                    toast.error($LL.ErrorsReview.Departments())
                    break
                default:
                    toast.error($LL.ErrorsReview.Others())
                    break
            }
            return
        }
        if (current != steps.length - 1) current += 1
        else {
            document.getElementById('buttonGoForward')?.setAttribute('disabled', 'disabled')
            saveReview()
        }
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

    //Departments
    function handleDepartmentChange(departmentId: number) {
		const department = departments.find((d) => d.departmentId === departmentId);
        if (department) {
            const employeeIds = department.employees.map((employee: any) => employee.employeeId);
            if (review.reviewDepartmentsIds.includes(departmentId)) {
                review.reviewEmployeesIds = [...review.reviewEmployeesIds, ...employeeIds];
            } else {
                review.reviewEmployeesIds = review.reviewEmployeesIds.filter((id) => !employeeIds.includes(id));
            }
        }
	}
    function handleEmployeeChange(departmentId: number, employeeId: number) {
		const department = departments.find((d) => d.departmentId === departmentId);
		if (review.reviewEmployeesIds.includes(employeeId)) {
			if (!review.reviewDepartmentsIds.includes(departmentId)) {
				review.reviewDepartmentsIds = [...review.reviewDepartmentsIds, departmentId]
			}
		} else {
			if (!review.reviewEmployeesIds.some((id) => department.employees.map((employee: any) => employee.employeeId).includes(id))) {
				review.reviewDepartmentsIds = review.reviewDepartmentsIds.filter((id) => id !== departmentId)
			}
		}
	}
    async function getEmployeesOfDep(department: any, index: number) {
        let [responseEmployees] = await Promise.all([api("GET", `Departments/${department.departmentId}/Employees`)])
        department.employees = responseEmployees?.body
    }

    function disableInputs(toggle?: boolean) {
        if (toggle && action === 'add') { return true }
        if (action === 'add' && !addLangs.includes(chooseLanguage)) {
            return true
        }
    }

    //functions for create question
    function allowDrop(event: DragEvent) { event.preventDefault() } 
    function handleDrop(event: DragEvent) {
        if (action == "add") return
        event.preventDefault()
        const cardId = event.dataTransfer?.getData('text/plain')
        const selectedCard = cards.find(card => card.id.toString() === cardId)

        if (selectedCard) {
            const newQuestion: Question = {
                isRequired: false,
                position: review.questions.length + 1,
                responseType: selectedCard.name,
                translations: [],
                singleChoiceOptions: [],
                ratingOptions: []
            }
            review.translations.forEach(element => {
                newQuestion.translations = [...newQuestion.translations, {language: element.language, title: '', description: ''}]
            });

            review.questions = [...review.questions, newQuestion]
            selectedQuestion = newQuestion
        }
    }
    function handleDblClick(id: number) {
        if (action == "add") return
        const selectedCard = cards.find(card => card.id === id)
        const newQuestion: Question = {
                isRequired: false,
                position: review.questions.length + 1,
                responseType: selectedCard?.name,
                translations: [],
                singleChoiceOptions: [],
                ratingOptions: []
        }
        review.translations.forEach(element => {
            newQuestion.translations = [...newQuestion.translations, {language: element.language, title: '', description: ''}]
        })
        review.questions = [...review.questions, newQuestion]
        selectedQuestion = newQuestion
    }

    // functions for questions --------------------------------------------------------------------------------------------------
    function selectQuestion(question: Question) {
        selectedQuestion = question
    }

    function updateQuestion(question: Question) {
        let position = question.position
        review.questions[position - 1] = selectedQuestion
    }

    function removeQuestion(event: Event, index: number): void {
        review.questions = review.questions.filter((question) => question.position - 1 !== index)
        review.questions.forEach((question, index) => question.position = index + 1)
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

    // functions for option
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
    function addRatingOption(numericValue: number | null, title: string): void {
        let conditionIsTrue = false
        insertedNumericValue = null
        insertedTitle = ''
        if (numericValue == 0 || title == null || title == '') {
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
    function removeOption(index: number, optionType: number): void {
        if (optionType == 1) {
            selectedQuestion.singleChoiceOptions = selectedQuestion.singleChoiceOptions.filter((_, i) => i !== index)
        } else {
            selectedQuestion.ratingOptions = selectedQuestion.ratingOptions.filter((_, i) => i !== index)
        }
        updateQuestion(selectedQuestion)
    }

    $: review.reviewStatus = review.endDate != null ? 'Active' : 'NotStarted'
    $: review.startDate = review.endDate != null ? dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss') : null
</script>

<div class="flex flex-col text-gray-400 text-xs gap-y-10">
    <Steps clickable={true} size="2.3em" {steps} bind:current />

    {#if current == 0}
        <div class="flex flex-col gap-y-10">
            <div class="flex gap-x-5 items-center">
                <p class="text-black text-base font-semibold flex-shrink-0">{$LL.ChooseLanguage()}</p>
                <select bind:value={chooseLanguage} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                    {#each review.translations as translation}
                        <option value={translation.language}>{showLanguageTranslation(translation.language)}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewTitleTitle()}</p>
                <p>{$LL.ReviewTitleDescription}</p>
                {#each review.translations as translation}
                    {#if translation.language == chooseLanguage}
                        <input name="titleForm" class="w-auto my-1 p-2 text-black border rounded peer" bind:value={translation.title} disabled={disableInputs()} />
                    {/if}
                {/each}
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewDescriptionTitle()}</p>
                <p>{$LL.ReviewDescriptionDescription()}</p>
                {#each review.translations as translation}
                    {#if translation.language == chooseLanguage}
                        <textarea name="descriptionForm" rows="8" class="w-auto my-1 p-2 text-black border rounded" bind:value={translation.description} disabled={disableInputs()}></textarea>
                    {/if}
                {/each}
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewTypeTitle()}</p>
                <p>{$LL.ReviewTypeDescription()}</p>
                <div class="flex flex-col gap-2 mt-2">
                    {#each typeOfReview as type}
                        <div class="flex">
                            <input id="{type.name}" type="radio" name="radio-group" value="{type.value}" bind:group={review.reviewType} class="h-5 w-5 cursor-pointer" disabled={disableInputs(true)} />
                            <label for="{type.name}" class="flex gap-x-1 pl-2 cursor-pointer">
                                <p class="text-gray-600 font-semibold">{type.name}:</p>
                                <p>{type.text}</p>
                            </label>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {:else if current == 1}
        <div class="flex flex-col gap-y-5">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.SelectDepartmentsLabel()}</p>
                <p>{$LL.SelectDepartmentsText()}</p>
            </div>

            <div class="flex flex-col gap-y-5 text-gray-600">
                {#each departments as department, indexD}
                    <div class="flex gap-x-2 items-center">
                        <input id={department.departmentId} type="checkbox" bind:group={review.reviewDepartmentsIds} value={department.departmentId} on:change={() => handleDepartmentChange(department.departmentId)} disabled={disableInputs(true)} />
                        <label for={department.departmentId} class="flex gap-x-2 items-center cursor-pointer">
                            <svelte:component this={openMenu[indexD] || review.reviewDepartmentsIds.includes(department.departmentId) ? FolderOpen : Folder} />
                            {department.departmentDescription}
                        </label>
                    </div>
                    {#await getEmployeesOfDep(department, indexD) then}
                        {#if openMenu[indexD] || review.reviewDepartmentsIds.includes(department.departmentId)}
                            {#if department.employees != 0}
                                {#each department.employees as employee}
                                    <div class=" flex px-6 gap-x-2 items-center">
                                        <input id={employee.employeeId} type="checkbox" bind:group={review.reviewEmployeesIds} value={employee.employeeId} on:change={() => handleEmployeeChange(department.departmentId, employee.employeeId)} disabled={disableInputs(true)} />
                                        <label for={employee.employeeId} class="flex gap-x-2 items-center cursor-pointer">
                                            <svelte:component this={User} />
                                            <p>{employee.employeeName}</p>
                                        </label>
                                    </div>
                                {/each}
                            {:else}
                                <div class=" flex px-6 gap-x-2 items-center">
                                    <p>{$LL.NoEmployees()}</p>
                                </div>
                            {/if}
                        {/if}
                    {/await}
                {/each}
            </div>
        </div>
    {:else if current == 2}
        <div class="flex gap-x-10">
            <div class="flex flex-col gap-y-2">
                <p class="text-black text-base font-semibold">{$LL.QuestionTypeText()}</p>
                <div class="flex flex-col gap-y-2">
                    {#each cards as card}
                        <p use:draggable={card.id} on:dblclick="{() => handleDblClick(card.id)}" class="flex items-center gap-x-2 p-2 bg-gray-100 text-gray-600 border border-gray-200 font-bold rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="{card.icon}"/>
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
                    {#if review.questions.length == 0}
                        <p>{$LL.FormPreviewPlaceholder()}</p>
                    {/if}
                    {#each review.questions as question, index}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div in:fade={{ duration: 500 }} out:fly={{ y: -200, duration: 500 }} id="questionsAdded" class="group bg-white flex flex-col gap-y-5 px-2 py-4 rounded border border-transparent cursor-pointer hover:border-blue-500 relative shadow-lg" class:selected={question == selectedQuestion} on:click={() => selectQuestion(question)}>
                            {#if action != "add"}
                                <button class="md:hidden md:group-hover:flex absolute top-0 right-0 p-2" on:click={(event) => removeQuestion(event, index)}>
                                    <svelte:component this={X} />
                                </button>
                            {/if}
                            <div class="flex flex-row gap-x-2">
                                <p class="text-blue-500 font-extrabold">Q{question.position}</p>
                                <div class="flex flex-col gap-y-1">
                                    {#each question.translations as translation}
                                        {#if translation.language == chooseLanguage}
                                            {#if translation.title}
                                                <p class="text-black font-bold">{translation.title}</p>
                                            {:else}
                                                <p>{$LL.NoTitle()}</p>
                                            {/if}
                                            {#if translation.description}
                                                <p>{translation.description}</p>
                                            {:else}
                                                <p>{$LL.NoDescription()}</p>
                                            {/if}
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
                                            <div class="bg-gray-100 flex items-center gap-x-2 py-2 px-5 rounded-lg">
                                                {#each singleChoice.translations as translation}
                                                    {#if translation.language == chooseLanguage}
                                                        <svelte:component this={Square} />
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
            <div class="flex flex-col gap-y-2 flex-1">
                <p class="text-black text-base font-semibold">{$LL.QuestionProperties()}</p>
                <div class="bg-gray-100 flex flex-col h-full gap-y-10 shadow-lg rounded-lg p-5 border border-gray-200">
                    {#if selectedQuestion && selectedQuestion.position !== -1}
                        <div class="flex gap-x-2">
                            <p class="text-blue-500 font-extrabold text-base">Q{selectedQuestion.position}</p>
                            {#each selectedQuestion.translations as translation, index}
                                {#if translation.language == chooseLanguage}
                                    <p class="text-black font-semibold text-base text-ellipsis">{selectedQuestion.translations[index].title}</p>
                                {/if}
                            {/each}
                        </div>
                        <div class="flex flex-col gap-y-5">
                            <div class="flex gap-x-2">
                                <p class="text-black text-sm font-semibold">{$LL.Required()}</p>
                                <label class="toggle">
                                    <input type="checkbox" checked="{selectedQuestion.isRequired}" on:change={() => selectedQuestion.isRequired = !selectedQuestion.isRequired} disabled={disableInputs(true)}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-black text-sm font-semibold">{$LL.Title()}</p>
                                {#each selectedQuestion.translations as translation, index}
                                    {#if translation.language == chooseLanguage}
                                        <input class="text-black p-2 rounded" placeholder={$LL.Title()} bind:value={selectedQuestion.translations[index].title} on:blur={() => updateQuestion(selectedQuestion)} disabled={disableInputs()} />
                                    {/if}
                                {/each}
                            </div>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-black text-sm font-semibold">{$LL.Description()}</p>
                                {#each selectedQuestion.translations as translation, index}
                                    {#if translation.language == chooseLanguage}
                                        <textarea class="text-black p-2 rounded" placeholder={$LL.Description()} bind:value={selectedQuestion.translations[index].description} on:blur={() => updateQuestion(selectedQuestion)} rows="5" disabled={disableInputs()}></textarea>
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
                                                        <input class="bg-white p-2 text-black rounded flex-grow" bind:value={translation.description} on:blur={() => updateQuestion(selectedQuestion)} disabled={disableInputs()} />
                                                    {/if}
                                                {/each}
                                                {#if action != "add"}
                                                    <button on:click={() => removeOption(index, 2)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-black">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>  
                                                    </button>
                                                {/if}
                                            </div>
                                        {/each}
                                        {#if action != "add"}
                                            <div class="flex gap-x-2">
                                                <input id="numericValueRatingOption" type="number" pattern="[0-9]*" class="bg-white w-[70px] p-2 text-black border border-dashed border-gray-500 rounded" bind:value={insertedNumericValue} placeholder={$LL.Numeric()} disabled={disableInputs()} />
                                                <input id="titleRatingOption" class="bg-white p-2 text-black border border-dashed border-gray-500 rounded flex-grow" bind:value={insertedTitle} placeholder={$LL.AddOption()} disabled={disableInputs()} />
                                                <button on:click={() => addRatingOption(insertedNumericValue, insertedTitle)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500 hover:bg-blue-100 rounded-full">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        {/if}
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
                                                        <input class="bg-white p-2 text-black rounded flex-grow" bind:value={option.translations[i].description} on:blur={() => updateQuestion(selectedQuestion)} disabled={disableInputs()} />
                                                    {/if}
                                                {/each}
                                                {#if action != "add"}
                                                    <button on:click={() => removeOption(index, 1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-black">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                {/if}
                                            </div>
                                        {/each}
                                        {#if action != "add"}
                                            <div class="flex gap-x-2">
                                                <input class="bg-white p-2 text-black border border-dashed border-gray-500 rounded flex-grow" bind:value={insertedSingleChoiceOption} placeholder={$LL.AddOption()} />
                                                <button on:click={() => addSingleChoiceOption(insertedSingleChoiceOption)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500 hover:bg-blue-100 rounded-full">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {:else if current == 3}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.SaveReviewAsForm()}</p>
                <p>{$LL.SaveReviewAsFormDesc()}</p>
                <div class="flex items-center m-5">
                    <input on:click={() => saveAsForm = !saveAsForm} checked={saveAsForm} id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-600">{$LL.SaveForm()}</label>
                </div>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.StartAndEndDateText()}</p>
                <p>{$LL.StartAndEndDateDesc()}</p>
                <div class="flex items-center m-5 gap-x-10">
                    <div class="flex flex-col gap-y-2">
                        <p class="text-sm font-medium text-gray-600">{$LL.EndDate()}</p>
                        <DateInput bind:value={review.endDate} placeholder="" closeOnSelection max={maxDateAllowed} timePrecision=minute />
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <div class="flex justify-between mt-10">
        <button on:click={handleStepBackward} id="buttonGoBack" class="flex items-center gap-x-2 md:text-lg font-semibold px-5 py-2 border border-transparent hover:bg-gray-100 rounded">
            <svelte:component this={ChevronLeft} strokeWidth="4" size={20} />
            {$LL.Return()}
        </button>

        <button on:click={handleStepForward} id="buttonGoForward" class="flex items-center gap-x-2 md:text-lg font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">
            {#if current != steps.length - 1}
                {$LL.Forward()}
            {:else}
                {$LL.Finalize()}
            {/if}
            <svelte:component this={ChevronRight} strokeWidth="4" size={20} />
        </button>
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

    /* Add border blue to selected question */
    .selected {
        border-color: #3B82F6;
    }
</style>