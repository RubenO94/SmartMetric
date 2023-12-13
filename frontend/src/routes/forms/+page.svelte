<script lang="ts">
    import { LL, locale } from "../../i18n/i18n-svelte"

    export let data

    let responseData = data.formTemplates
    let totalForms = data.total
    let pageSize = data.pageSize
    let pageNumber = data.pageNumber
    let lang = $locale.toUpperCase()

    $: totalPages = Math.ceil(totalForms / pageSize)
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-10">
    <!-- Title and Create button-->
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl">{ $LL.Sidebar.Forms() }</h1>
        <a href="forms/createForm/" class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            { $LL.FormButton() }
        </a>
    </div>
    <!-- Search bar -->
    <div class="flex flex-row">
        <input class="bg-gray-100 w-full p-4 rounded-l-lg text-sm border border-gray-200" type="search" placeholder="{$LL.FormSearchInput()}" />
        <button class="bg-blue-500 text-white py-2 px-4 rounded-r-lg border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </button>
    </div>

    <!-- List of form models -->
    <div class="flex flex-col">
        <!-- for each cycle of formTemplates -->
        {#each responseData as formTemplate}
            {#each formTemplate.translations as translation}
                {#if translation.language == lang}
                    <div class="flex flex-row justify-between items-center border-b border-gray-300 px-5 py-2 gap-x-2 hover:bg-gray-100">
                        <div class="flex gap-x-4 flex-grow">
                            <div class="bg-green-200 p-6 rounded-md flex items-center justify-center">AA</div>
                            <div class="flex flex-col gap-x-1 pt-2">
                                <p>{translation.title}</p>
                                <p class="text-xs text-gray-400">{translation.description}</p>
                            </div>
                        </div>
                        <div class="flex gap-x-2">
                            <a href="/forms/{formTemplate.formTemplateId}" class="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg border border-transparent cursor-pointer whitespace-nowrap hover:bg-blue-700 hover:border-blue-950">{$LL.Preview()}</a>
                            <div class="relative inline-block group">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        {/each}
    </div>

    <div class="flex rounded w-min mx-auto">
        {#each Array(totalPages) as _, index}
            <a 
                href="/forms?page={index + 1}&pageSize={pageSize}" 
                class="px-3 py-1 border {pageNumber === index + 1 ? 'bg-blue-500 border-blue-500' : 'hover:bg-gray-100 hover:border-gray-500'} {index !== totalPages - 1 ? '' : ''}"
            >
                {index + 1}
            </a>
        {/each}
    </div>
</div>