<script lang="ts">
    import { api } from "$lib/api/_api"
    import { LL, locale } from "../../i18n/i18n-svelte"
    import toast, { Toaster } from "svelte-french-toast"

    export let data

    let responseData = data.formTemplates
    let totalForms = data.total
    let pageSize = data.pageSize
    let lang = $locale.toUpperCase()
    let formTemplateToDelete = ''

    function showDialog(index: string) {
        formTemplateToDelete = index
        let dialog = document.getElementById('dialog');
        dialog?.classList.remove('hidden');
    }

    function hideDialog() {
        let dialog = document.getElementById('dialog');
        setTimeout(() => {
            dialog?.classList.add('hidden');
        }, 100);
    }

    async function deleteFormTemplate() {
        hideDialog()
        const [requestForm] = await Promise.all([
            api ("DELETE", `FormTemplates/${formTemplateToDelete}`)
        ])
    
        let response = requestForm
        if (response?.status == 204) {
            toast.success(response.message)
            responseData = responseData.filter((element: any) => element.formTemplateId !== formTemplateToDelete)
        } else toast.error(response?.details)
    }

    $: totalPages = Math.ceil(totalForms / pageSize)
    $: responseData
</script>

<svelte:head>
    <title>{$LL.Sidebar.Forms()}</title>
</svelte:head>

<Toaster />

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
        {#each responseData as formTemplate, i}
            {#each formTemplate.translations as translation}
                {#if translation.language == lang}
                    <div class="flex flex-row justify-between items-center border-b border-gray-300 px-5 py-2 gap-x-2">
                        <div class="flex gap-x-4 flex-grow">
                            <div class="bg-green-200 p-6 rounded-md flex items-center justify-center">AA</div>
                            <div class="flex flex-col gap-x-1 pt-2">
                                <p>{translation.title}</p>
                                <p class="text-xs text-gray-400">{translation.description}</p>
                            </div>
                        </div>
                        <div class="flex gap-x-2">
                            <a href="/forms/{formTemplate.formTemplateId}" class="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg border border-transparent cursor-pointer whitespace-nowrap hover:bg-blue-700 hover:border-blue-950">{$LL.Preview()}</a>
                            <button on:click={() => showDialog(formTemplate.formTemplateId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>

                            <!-- DIALOG -->
                            <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                                <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5">
                                    <div class="flex items-center gap-5">
                                        <div class="bg-red-200 text-red-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                            <p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                </svg>                                    
                                            </p>                                                                               
                                        </div>
                                        <div>
                                            <h1 class="font-bold text-lg mb-2">{$LL.DeleteDialogForm()}</h1>
                                            <p>{$LL.DeleteDialogFormDesc()}</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-end gap-4 mt-5">
                                        <button class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200" on:click="{hideDialog}">{$LL.Cancel()}</button>
                                        <button class="bg-red-500 px-6 py-2 rounded text-white hover:bg-red-600" on:click="{deleteFormTemplate}">{$LL.Delete()}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
</div>