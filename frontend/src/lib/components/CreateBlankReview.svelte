<script lang="ts">
    import LL from "../../i18n/i18n-svelte"
    import toast, { Toaster } from 'svelte-french-toast'
    import { Steps } from 'svelte-steps'

    let currentStep = 0
    let review: Reviews = {
        createdByUserId: 1,
        startDate: '',
        endDate: '',
        reviewType: '',
        reviewStatus: '',
        translations: [{language: 'PT', title: '', description: ''}],
        questions: [],
        reviewDepartmentsIds: []
    }
    let steps = [{ text: $LL.Details() }, { text: $LL.Departments() }, { text: $LL.Questions() }, { text: $LL.Finalize() }]

    //buttons of stepper
    const handleStepBackward = (event: Event) => {
        if (currentStep != 0) currentStep -= 1
    }
    const handleStepForward = async (event: Event) => { 
        if (currentStep != steps.length - 1) currentStep += 1
    }
</script>

<Toaster />

<div class="flex flex-col text-gray-400 text-xs gap-y-16">
    <Steps clickable={false} {steps} size="2.3em" bind:current={currentStep} />

    {#if currentStep == 0}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-row gap-x-5 items-center">
                <p class="text-black text-base font-semibold flex-shrink-0">{$LL.ChooseLanguage()}</p>
                <select bind:value={review.translations[0].language} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                    <option value="PT">{$LL.Portuguese()}</option>
                    <option value="EN">{$LL.English()}</option>
                    <option value="ES">{$LL.Spanish()}</option>
                    <option value="FR">{$LL.French()}</option>
                    <option value="PL">{$LL.Polish()}</option>
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewTitleTitle()}</p>
                <p>{$LL.ReviewTitleDescription()}</p>
                <input name="titleForm" class="w-auto my-1 p-2 text-black border rounded" bind:value={review.translations[0].title} />
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewDescriptionTitle()}</p>
                <p>{$LL.ReviewDescriptionDescription()}</p>
                <textarea name="descriptionForm" rows="8" class="w-auto my-1 p-2 text-black border rounded" bind:value={review.translations[0].description}></textarea>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.ReviewTypeTitle()}</p>
                <p>{$LL.ReviewTypeDescription()}</p>
            </div>
        </div>
    {:else if currentStep == 1}
        <p>Departments</p>
    {:else if currentStep == 2}
        <p>Questions</p>
    {:else}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.SaveReviewAsForm()}</p>
                <p>{$LL.SaveReviewAsFormDesc()}</p>
                <div class="flex items-center m-5">
                    <input id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-600">{$LL.Save()}</label>
                </div>
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">{$LL.StartAndEndDateText()}</p>
                <p>{$LL.StartAndEndDateDesc()}</p>
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