<script lang="ts">
    import { api } from "$lib/api/_api"
    import { LL, locale } from "../../i18n/i18n-svelte"
    import { AlertCircle, AlertTriangle, Plus, Search, Trash2 } from 'lucide-svelte'
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

<div class="mx-auto flex flex-col xl:w-[1200px] lg:w-[900px] md:w-[750px] p-10 gap-y-10">
    <!-- Title and Create button-->
    <div class="flex flex-col md:flex-row justify-between">
        <h1 class="font-semibold text-2xl">{ $LL.Sidebar.Forms() }</h1>
        <a href="forms/createForm/" class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svelte:component this={Plus} />
            { $LL.FormButton() }
        </a>
    </div>
    <!-- Search bar -->
    <div class="flex flex-row">
        <input class="bg-gray-100 w-full p-4 rounded-l-lg text-sm border border-gray-200" type="search" placeholder="{$LL.FormSearchInput()}" />
        <button class="bg-blue-500 text-white py-2 px-4 rounded-r-lg border border-transparent hover:bg-blue-700 hover:border-blue-950">
            <svelte:component this={Search} />
        </button>
    </div>

    <!-- List of form models -->
    <div class="flex flex-col">
        <!-- for each cycle of formTemplates -->
        {#if responseData.length > 0}
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
                                    <svelte:component this={Trash2} class="hover:text-gray-400" />
                                </button>

                                <!-- DIALOG -->
                                <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                                    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-4/5 lg:w-3/5 xl:w-2/5">
                                        <div class="flex items-center gap-5">
                                            <div class="bg-red-200 text-red-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                                <p><svelte:component this={AlertTriangle} /></p>
                                            </div>
                                            <div>
                                                <h1 class="font-bold text-lg mb-2">{$LL.DeleteDialogForm()}</h1>
                                                <p class="text-gray-400 text-sm">{$LL.DeleteDialogFormDesc()}</p>
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
        {:else}
            <div class="flex justify-center items-center border py-10 rounded border-gray-300 bg-gray-100">
                <div class="flex flex-col items-center text-gray-400 p-5">
                    <svelte:component this={AlertCircle} />
                    <p>{$LL.FormDivText()}</p>
                </div>
            </div>
        {/if}
    </div>
</div>