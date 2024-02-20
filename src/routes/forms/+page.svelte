<script lang="ts">
    import { api } from "$lib/api/_api"
    import { LL } from "../../i18n/i18n-svelte"
    import { AlertCircle, ChevronLeft, ChevronRight, Eye, MoreVertical, Plus, Search, Trash2, XCircle } from 'lucide-svelte'
    import toast, { Toaster } from "svelte-french-toast"
    import { Dropdown, DropdownItem } from 'flowbite-svelte'
    import { onMount } from "svelte";

    export let data

    let user = data.user
    let forms: any = []
    let languages = ['PT', 'EN', 'ES', 'FR', 'PL']
    let lang: string = languages[0]
    let formTemplateToDelete = ""
    let isDropdownOpen: boolean[] = Array(forms.length).fill(false)
    let searchInput = ""
    let firstElement: number = 0, lastElement: number = 0, totalForms: number = 0, currentPage: number = 1, sizePage: number = 5

    function checkPermission(permissionType: string) {
        const window = user?.authorizations.find((x: any) => x.windowType === "Forms")
        const permission = window.permissions.find((y: any) => y.permissionType === permissionType)
        return permission.hasPermission
    }

    function showDialog(id: string, index: number) {
        isDropdownOpen[index] = false
        formTemplateToDelete = id
        let dialog = document.getElementById('dialog');
        dialog?.classList.remove('hidden');
    }

    function hideDialog() {
        let dialog = document.getElementById('dialog');
        setTimeout(() => {
            dialog?.classList.add('hidden');
        }, 100);
    }

    function changePage(change: string) {
        if (change === 'increment' && currentPage < Math.ceil(totalForms / sizePage)) currentPage++
        else if (change === 'decrement' && currentPage > 1) currentPage--
        loadFormTemplate()
    }

    async function loadFormTemplate() {
        const [response] = await Promise.all([
            api("GET", `FormTemplates?page=${currentPage}&pageSize=${sizePage}&language=${lang}&name=${searchInput}`)
        ])

        if (response) {
            forms = response.body
            totalForms = response.total
        } else {
            console.log("Failed to fetch forms")
        }
    }

    async function deleteFormTemplate() {
        hideDialog()
        const [requestForm] = await Promise.all([
            api ("DELETE", `FormTemplates/${formTemplateToDelete}`)
        ])
    
        let response = requestForm
        if (response?.status == 204) {
            toast.success($LL.DeleteFormMessage())
            forms = forms.filter((element: any) => element.formTemplateId !== formTemplateToDelete)
        } else toast.error(response?.details)
        loadFormTemplate()
    }

    onMount(async () => { loadFormTemplate() })

    $: {
        firstElement = Math.min((currentPage - 1) * sizePage + 1, totalForms)
        lastElement = Math.min(currentPage * sizePage, totalForms)
    }
</script>

<svelte:head>
    <title>{$LL.Sidebar.Forms()}</title>
</svelte:head>

<Toaster />

<!-- DIALOG -->
<div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500 z-50">
    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-4/5 lg:w-3/5 xl:w-2/5">
        <div class="flex items-center gap-5">
            <div class="bg-red-200 text-red-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                <p><svelte:component this={XCircle} /></p>
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

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    <!-- Changing language -->
    <div class="flex mx-auto p-1 gap-x-1 border border-gray-300 text-gray-500 rounded">
        {#each languages as language}
            <button class="py-1 px-2 rounded text-sm {language === lang ? 'bg-blue-500 text-white' : 'hover:bg-gray-100' }" on:click={() => {lang = language, searchInput = '', loadFormTemplate()}}>{language}</button>
        {/each}
    </div>

    <!-- Title and Create button-->
    <div class="flex flex-col md:flex-row gap-y-5 justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Sidebar.Forms() }</h1>
        <div class="flex gap-x-2">
            {#if checkPermission("Create")}
                <a href="forms/createForm/" class="flex mx-auto md:mx-0 items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border border-transparent hover:bg-blue-700 hover:border-blue-950">
                    <svelte:component this={Plus} />
                    { $LL.FormButton() }
                </a>
            {/if}
        </div>
    </div>

    <!-- Search bar -->
    <div class="flex relative">
        <input bind:value={searchInput} on:input={() => { currentPage = 1; loadFormTemplate() }} type="text" class="bg-gray-100 w-full pl-12 pr-5 py-4 rounded-lg text-sm border border-gray-200" placeholder="{$LL.FormSearchInput()}" /> 
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
            <Search />
        </div>
    </div>

    <!-- List of form models -->
    <div class="flex flex-col h-[400px] overflow-hidden">
        {#if totalForms > 0}
            {#each forms as formTemplate, index}
                {#each formTemplate.translations as translation}
                    {#if translation.language == lang}
                        <div class="flex gap-x-2 justify-between md:items-center h-20 p-4 border-b border-gray-300 {index == 0 ? 'rounded-t' : ''}">
                            <div class="flex gap-x-4 flex-grow">
                                <div class="flex flex-col gap-x-1 pt-1">
                                    <p class="text-sm md:text-base">{translation.title}</p>
                                    <p class="text-xs text-gray-400">{translation.description}</p>
                                </div>
                            </div>

                            <div class="hidden md:flex gap-x-2">
                                <a href="/forms/{formTemplate.formTemplateId}" class="bg-blue-500 text-white text-xs md:text-sm px-2 py-1 rounded-lg border border-transparent cursor-pointer whitespace-nowrap hover:bg-blue-700 hover:border-blue-950">{$LL.Preview()}</a>
                                {#if checkPermission("Delete")}
                                    <button on:click={() => showDialog(formTemplate.formTemplateId, index)}>
                                        <svelte:component this={Trash2} class="hover:text-gray-400" />
                                    </button>
                                {/if}
                            </div>

                            <div class="relative group md:hidden items-center">
                                <button class="cursor-pointer hover:bg-gray-100 p-2 rounded focus:bg-gray-100">
                                    <svelte:component this={MoreVertical} />
                                </button>
                                <Dropdown bind:open={isDropdownOpen[index]}>
                                    <DropdownItem href={`/forms/${formTemplate.formTemplateId}`} class="flex items-center gap-x-2 whitespace-nowrap">
                                        <svelte:component this={Eye} size="20" />
                                        {$LL.Preview()}
                                    </DropdownItem>
                                    {#if checkPermission("Delete")}
                                        <DropdownItem on:click={() => showDialog(formTemplate.formTemplateId, index)} class="flex items-center gap-x-2 whitespace-nowrap">
                                            <svelte:component this={Trash2} size="20" />
                                            {$LL.Delete()}
                                        </DropdownItem>
                                    {/if}
                                </Dropdown>
                            </div>
                        </div>
                    {/if}
                {/each}
            {/each}
        {:else}
            <div class="flex justify-center items-center rounded">
                <div class="flex flex-col items-center text-gray-400 p-5 gap-y-2">
                    <svelte:component this={AlertCircle} size={50} />
                    <p>{$LL.FormDivText()}</p>
                </div>
            </div>
        {/if}
    </div>

    {#if totalForms != 0}
        <div class="flex justify-between text-sm px-[5px]">
            <p>{$LL.Showing()} {firstElement} {$LL.To()} {lastElement} {$LL.Of()} {totalForms} items</p>
            <div class="flex gap-x-[10px]">
                <button on:click={() => changePage("decrement")} class="mx-auto border border-gray-200 hover:bg-gray-100 shadow rounded"><ChevronLeft /></button>
                <button on:click={() => changePage("increment")} class="mx-auto border border-gray-200 hover:bg-gray-100 shadow rounded"><ChevronRight /></button>
            </div>
        </div>
    {/if}
</div>