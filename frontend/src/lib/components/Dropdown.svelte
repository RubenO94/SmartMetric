<script lang="ts">
    import { goto } from "$app/navigation"
    import LL from "../../i18n/i18n-svelte"

    export let formTemplate: FormTemplate
    
    let isOpen = false

    function toggleDropdown() { isOpen = !isOpen }
    function unToggleDropdown() { isOpen = false }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative text-xs" on:mouseleave={unToggleDropdown}>
    <button class="cursor-pointer focus:outline-none" on:click={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
    </button>

    {#if isOpen}
        <div class="absolute p-2 bg-gray-50 border border-gray-300 shadow-md rounded-lg">
            <ul class="flex flex-col">
                <button class="cursor-pointer whitespace-nowrap flex items-center gap-x-2" on:click={() => {goto(`/`)}}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>                      
                        {$LL.AddLanguage()}
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => goto(`/forms/${formTemplate.formTemplateId}/edit`)}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>                      
                        {$LL.Edit()}
                    </p>
                </button>
            </ul>
        </div>
    {/if}
</div>