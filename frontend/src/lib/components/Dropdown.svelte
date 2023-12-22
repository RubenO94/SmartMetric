<script lang="ts">
    import { goto } from "$app/navigation"

    export let formTemplate: FormTemplate
    
    let isOpen = false

    function toggleDropdown() { isOpen = !isOpen }
</script>

<div class="relative">
    <button class="cursor-pointer focus:outline-none" on:click={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
    </button>
    {#if isOpen}
        <div class="absolute mt-2 bg-gray-50 border border-gray-300 shadow-md rounded-lg">
            <ul class="flex flex-col px-2 py-2">
                <button class="cursor-pointer whitespace-nowrap flex items-center gap-x-2" on:click={() => {goto(`/`)}}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>                      
                        Adicionar idioma
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => goto(`/forms/${formTemplate.formTemplateId}/edit`)}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>                      
                        Editar
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => goto(`/`)}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>                      
                        Eliminar
                    </p>
                </button>
            </ul>
        </div>
    {/if}
</div>