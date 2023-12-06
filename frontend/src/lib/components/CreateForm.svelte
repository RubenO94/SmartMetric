<script lang="ts">
    // IMPORTS
    import { Steps } from 'svelte-steps'
    import LL from '../../i18n/i18n-svelte'
    import { draggable } from '$lib/actions/dnd'
    import { fade, fly } from 'svelte/transition'
    import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
    import { goto } from '$app/navigation';

    //VARIABLES
    let formTemplate: FormTemplate = {translations: [{language: 'PT', title: '', description: ''}], questions: []}
    let questions: Question[] = []
    let insertedSingleChoiceOption: string = '' 
    let insertedNumericValue: number | null = null
    let insertedTitle: string = ''
    let currentStep = 0
    let selectedQuestion: Question
    let steps = [{ text: $LL.Details() }, { text: $LL.Questions() }, { text: $LL.Finalize() }]
    let cards = [
        {
            id: 1,
            title: $LL.QuestionType.Text(),
            name: 'Text'
        },
        {
            id: 2,
            title: $LL.QuestionType.SingleChoice(),
            name: 'SingleChoice'
        },
        {
            id: 3,
            title: $LL.QuestionType.Rating(),
            name: 'Rating'
        }
    ]

    //Functions for Stepper
    const handleStepBackward = (event: Event) => {
        if (currentStep != 0) currentStep -= 1
    }
    const handleStepForward = async (event: Event) => { 
        console.log(formTemplate)
        if (currentStep != 2) currentStep += 1
        else {
            const request = await fetch("http://localhost:5104/api/v1/FormTemplates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    createdByUserId: 999,
                    translations: [
                        {
                            language: "EN",
                            title: "FormTemplate 01",
                            description: "Description for formTemplate 01"
                        }
                    ],
                    questions: [
                        {
                            isRequired: true,
                            position: 1,
                            responseType: "Text",
                            translations: [
                                {
                                    language: "EN",
                                    title: "This is a question of type Text"
                                }
                            ]
                        }
                    ]
                })
            })

            const response = await request.json() 

            if (response.status != 200) {
                console.log(response.message)
                goto('/forms')
            } else {
                console.log(response.message)
                goto('/forms')
            }
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
                title: "",
                description: "",
                type: selectedCard.name,
                position: questions.length + 1,
                required: false,
                singleChoiceOption: [],
                ratingOption: []
            }

            questions = [...questions, newQuestion]
            console.log(questions)
        }
    }

    //Function to remove question
    function removeQuestion(event: Event, index: number): void {
        questions = questions.filter((question) => question.position - 1 !== index)
        questions.forEach((question, index) => question.position = index + 1)
        if (selectedQuestion && selectedQuestion.position - 1 == index) {
            selectedQuestion = {
                title: "",
                description: "",
                type: "",
                position: -1,
                required: false,
                singleChoiceOption: [],
                ratingOption: []
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
            return
        }
        selectedQuestion.singleChoiceOption = [...selectedQuestion.singleChoiceOption, {title: insertedOption, description: ""}]
        updateQuestion(selectedQuestion)
    }

    //Function to add rating option
    function addRatingOption(numericValue: number | null, title: string): void {
        let conditionIsTrue = false
        insertedNumericValue = 0
        insertedTitle = ''
        if (numericValue == 0 || title == null || title == '') {
            console.log("Invalid insert")
            return
        }
        selectedQuestion.ratingOption.forEach(element => {
            if (element.numericValue == numericValue) {
                conditionIsTrue = true
                console.log("This number already exist")
                return
            }
        })
        if (conditionIsTrue) return
        selectedQuestion.ratingOption = [...selectedQuestion.ratingOption, {numericValue: numericValue, title: title, description: ""}]
        updateQuestion(selectedQuestion)
    }

    //Function to delete option (optionType == 1 is sco, optionType == 2 is rto)
    function removeOption(index: number, optionType: number): void {
        if (optionType == 1) {
            selectedQuestion.singleChoiceOption = selectedQuestion.singleChoiceOption.filter((_, i) => i !== index)
        } else {
            selectedQuestion.ratingOption = selectedQuestion.ratingOption.filter((_, i) => i !== index)
        }
        updateQuestion(selectedQuestion)
    }

    //Everytime variable questions changes, formTemplate.questions is gonna change too
    $: formTemplate.questions = questions

</script>

<div class="flex flex-col text-gray-400 text-xs gap-y-16">
    <Steps clickable={false} {steps} size="2.3em" bind:current={currentStep} />

    {#if currentStep == 0}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-row gap-x-5 items-center">
                <p class="text-black text-base font-semibold flex-shrink-0">{$LL.ChooseLanguage()}</p>
                <select bind:value={formTemplate.translations[0].language} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                    <option value="PT">{$LL.Portuguese()}</option>
                    <option value="EN">{$LL.English()}</option>
                    <option value="ES">{$LL.Spanish()}</option>
                    <option value="FR">{$LL.French()}</option>
                    <option value="PL">{$LL.Polish()}</option>
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">Nome do modelo do formulário</p>
                <p>Insira um nome único para identificar o modelo de formulário. Este nome será usado para referenciar e selecionar o modelo ao criar uma nova revisão</p>
                <input name="titleForm" class="w-auto my-1 p-2 text-black border rounded" bind:value={formTemplate.translations[0].title} />
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">Descrição</p>
                <p>Adicione uma breve descrição que destaque o propósito ou conteúdo do modelo. Isso ajudará a fornecer orientação adicional sobre o modelo de formulário ao selecioná-lo para uma revisão.</p>
                <textarea name="descriptionForm" rows="8" class="w-auto my-1 p-2 text-black border rounded" bind:value={formTemplate.translations[0].description}></textarea>
            </div>
        </div>
    {:else if currentStep == 1}
        <div class="flex flex-row gap-x-10">
            <div class="flex flex-col gap-y-2">
                <p class="text-black text-base font-semibold">Tipo de Questão</p>
                <div class="flex flex-col gap-y-2">
                    {#each cards as card}
                        <p use:draggable={card.id} class="flex items-center gap-x-2 p-2 bg-gray-100 text-black font-bold rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                            </svg>
                            {card.title}
                        </p>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col gap-y-2 w-2/4">
                <p class="text-black text-base font-semibold">Pré-visualização do Formulário</p>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="bg-gray-100 min-h-[250px] h-full flex flex-col gap-y-2 shadow-lg rounded-lg p-5" on:drop="{handleDrop}" on:dragover="{allowDrop}">
                    {#if questions.length == 0}
                        <p>No questions yet, drag one type of question to add a question to this form.</p>
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
                                    <p class="text-black font-bold">{question.title}</p>
                                    <p>{question.description}</p>
                                </div>
                            </div>
                            {#if question.type === 'Rating' }
                                {#if question.ratingOption.length == 0}
                                    <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                        <p>No rating option answers yet.</p>
                                    </div>
                                {:else}
                                    <div class="flex gap-x-1">
                                        {#each question.ratingOption as rating}
                                            <div class="flex flex-col gap-y-1 items-center">
                                                <div class="bg-gray-100 p-5 rounded-full"></div>
                                                <p>{rating.numericValue}</p>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            {:else if question.type === 'SingleChoice' }
                                {#if question.singleChoiceOption.length == 0}
                                    <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                        <p>No single choice option answers yet.</p>
                                    </div>
                                {:else}
                                    <div class="flex flex-col gap-y-1">
                                        {#each question.singleChoiceOption as singleChoice}
                                            <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                                <p>{singleChoice.title}</p>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            {:else}
                                <div class="bg-gray-100 py-2 px-5 rounded-lg">
                                    <p>Text Answer...</p>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex flex-col gap-y-2 flex-grow">
                <p class="text-black text-base font-semibold">Propriedades da Questão</p>
                <div class="bg-gray-100 flex flex-col h-full gap-y-10 shadow-lg rounded-lg p-5">
                    {#if selectedQuestion && selectedQuestion.position !== -1}
                        <div class="flex gap-x-2">
                            <p class="text-blue-500 font-extrabold text-base">Q{selectedQuestion.position}</p>
                            <p class="text-black font-semibold text-base">{selectedQuestion.title}</p>
                        </div>
                        <div class="flex flex-col gap-y-5">
                            <div class="flex gap-x-2">
                                <p class="text-black text-sm font-semibold">Required</p>
                                <label class="toggle">
                                    <input type="checkbox" checked="{selectedQuestion.required}" on:change={() => selectedQuestion.required = !selectedQuestion.required}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-black text-sm font-semibold">Titulo</p>
                                <input class="text-black p-2 rounded" placeholder="Title" bind:value={selectedQuestion.title} on:blur={() => updateQuestion(selectedQuestion)} />
                            </div>
                            <div class="flex flex-col gap-y-1">
                                <p class="text-black text-sm font-semibold">Descricao</p>
                                <textarea class="text-black p-2 rounded" placeholder="Description" bind:value={selectedQuestion.description} on:blur={() => updateQuestion(selectedQuestion)} rows="5"></textarea>
                            </div>
                            {#if selectedQuestion.type == 'Rating'}
                                <div class="flex flex-col gap-y-1">
                                    <p class="text-black text-sm font-semibold">Respostas</p>
                                    <div class="flex flex-col justify-center gap-y-1">
                                        {#each selectedQuestion.ratingOption as option, index}
                                            <div class="flex gap-x-2">
                                                <p class="bg-white p-2 text-black border border-gray-500 rounded flex-grow">{option.title}</p>
                                                <button on:click={() => removeOption(index, 2)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-black">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>  
                                                </button>
                                            </div>
                                        {/each}
                                        <div class="flex gap-x-2">
                                            <input id="numericValueRatingOption" class="bg-white w-16 p-2 text-black border border-dashed border-gray-500 rounded" bind:value={insertedNumericValue} placeholder="Numeric" />
                                            <input id="titleRatingOption" class="bg-white p-2 text-black border border-dashed border-gray-500 rounded flex-grow" bind:value={insertedTitle} placeholder="Adicionar nova opção" />
                                            <button on:click={() => addRatingOption(insertedNumericValue, insertedTitle)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500 hover:bg-blue-100 rounded-full">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {:else if selectedQuestion.type == 'SingleChoice'}
                                <div class="flex flex-col gap-y-1">
                                    <p class="text-black text-sm font-semibold">Respostas</p>
                                    <div class="flex flex-col justify-center gap-y-1">
                                        {#each selectedQuestion.singleChoiceOption as option, index}
                                            <div class="flex gap-x-2">
                                                <p class="bg-white p-2 text-black border border-gray-500 rounded flex-grow">{option.title}</p>
                                                <button on:click={() => removeOption(index, 1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-black">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        {/each}
                                        <div class="flex gap-x-2">
                                            <input class="bg-white p-2 text-black border border-dashed border-gray-500 rounded flex-grow" bind:value={insertedSingleChoiceOption} placeholder="Adicionar nova opção" />
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
    {:else if currentStep == 2}
        <p>Finalizar</p>
    {/if}

    <div class="flex justify-between mt-10">
        <!-- Go Back button -->
        <button on:click={handleStepBackward} class="flex gap-x-2 text-lg font-semibold px-5 py-2 border border-transparent hover:bg-gray-100 rounded" id="buttonGoBack">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>              
            Voltar
        </button>
        <!-- Go Next button -->
        <button on:click={handleStepForward} type="submit" class="flex gap-x-2 text-lg font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded" id="buttonGoForward" value="Submit">
            {#if currentStep != 2}
                Avançar
            {:else}
                Finalizar
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
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

    #questionsAdded:focus {
        border-color: #3B82F6
    }

</style>