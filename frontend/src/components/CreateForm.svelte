<script lang="ts">
    import { Steps } from 'svelte-steps'
    import LL from '../i18n/i18n-svelte';

    let currentStep = 0
    let steps = [
        { text: $LL.Details() },
        { text: $LL.Questions() },
        { text: $LL.Finalize() }
    ];

    //Functions for Stepper
    const handleStepBackward = () => { if (currentStep != 0) currentStep -= 1 } 
    const handleStepForward = () => { if (currentStep != 2) currentStep += 1 }

</script>

<div class="flex flex-col text-gray-400 text-xs gap-y-16">
    <Steps clickable={false} {steps} size="2.3em" bind:current={currentStep} />

    {#if currentStep == 0}
        <div class="flex flex-col gap-y-10">
            <div class="flex flex-row gap-x-5 items-center">
                <p class="text-black text-base font-semibold">{$LL.ChooseLanguage()}</p>
                <select class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[960px] p-2">
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
                <input class="w-auto my-1 p-2 text-black border rounded" />
            </div>
            <div class="flex flex-col gap-y-1">
                <p class="text-black text-base font-semibold">Descrição</p>
                <p>Adicione uma breve descrição que destaque o propósito ou conteúdo do modelo. Isso ajudará a fornecer orientação adicional sobre o modelo de formulário ao selecioná-lo para uma revisão.</p>
                <textarea rows="8" class="w-auto my-1 p-2 text-black border rounded"></textarea>
            </div>
        </div>
    {/if}

    {#if currentStep == 1}
        <div class="flex flex-row gap-x-10">
            <div class="flex flex-col gap-y-2">
                <p class="text-black text-base font-semibold">Tipo de Questão</p>
                <div class="bg-gray-100 shadow-xl rounded-lg p-2">asdddddddd</div>
            </div>
            <div class="flex flex-col gap-y-2">
                <p class="text-black text-base font-semibold">Pré-visualização do Formulário</p>
                <div class="bg-gray-100 shadow-xl rounded-lg p-2">sdfdfsdfsfdsfasdasdasdasdasdadasd</div>
            </div>
            <div class="flex flex-col gap-y-2">
                <p class="text-black text-base font-semibold">Propriedades da Questão</p>
                <div class="bg-gray-100 shadow-xl rounded-lg p-2">sdfdfsdfsfdsfasdasdasdasdasdadasd</div>
            </div>
        </div>
    {/if}

    {#if currentStep == 2}
        <p>Finalizar</p>
    {/if}

    <div class="flex justify-between">
        <!-- Go Back button -->
        <button on:click={handleStepBackward} class="flex gap-x-2 text-lg font-semibold px-5 py-2 border border-transparent hover:bg-gray-100 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>              
            Voltar
        </button>
        <!-- Go Next button -->
        <button on:click={handleStepForward} class="flex gap-x-2 text-lg font-semibold px-5 py-2 border border-transparent bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-950 rounded">
            Avançar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>              
        </button>
    </div>
</div>
