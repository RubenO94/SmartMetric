<script lang="ts">
    import { goto } from "$app/navigation"
    import { api } from "$lib/api/_api"
    import toast, { Toaster } from "svelte-french-toast";
    import LL from "../../i18n/i18n-svelte"

    export let object: any
    
    let isOpen = false

    function toggleDropdown() { isOpen = !isOpen }
    function unToggleDropdown() { isOpen = false }

    function goToEditPage() {
        if (object.formTemplateId) goto(`/forms/${object.formTemplateId}/edit`)
        else if (object.reviewId) goto(`/reviews/${object.reviewId}/edit`)
    }

    function showDialog() {
        let dialog = document.getElementById('dialog');
        dialog?.classList.remove('hidden');
    }

    function hideDialog() {
        let dialog = document.getElementById('dialog');
        setTimeout(() => { dialog?.classList.add('hidden') }, 100);
    }

    async function deleteElement() {
        hideDialog()
        if (object.formTemplateId) {
            const [request] = await Promise.all([ api("DELETE", `FormTemplates/${object.formTemplateId}`) ])
            if (request?.status == 204) {
                toast.success($LL.DeleteFormMessage())
                goto("/forms")
            } 
            else toast.error($LL.ErrorsFormTemplate.Others())
        } else if (object.reviewId) {
            const [request] = await Promise.all([ api("DELETE", `Reviews/${object.reviewId}`) ])
            if (request?.status == 204) {
                toast.success($LL.DeleteReviewMessage())
                goto("/reviews")
            } 
            else toast.error($LL.ErrorsReview.Others())
        }
    }
</script>

<Toaster />

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
                <button class="cursor-pointer whitespace-nowrap flex items-center gap-x-2" on:click={() => goto(`/`)}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>                      
                        {$LL.AddLanguage()}
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => goToEditPage()}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>                      
                        {$LL.Edit()}
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => showDialog()}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>                          
                        {$LL.Delete()}
                    </p>
                </button>

                <!-- DIALOG -->
                <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5 flex flex-col gap-y-5">
                        <div class="flex items-center gap-5">
                            <div class="bg-red-200 text-red-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>                                                                          
                                </p>                                                                               
                            </div>
                            <div>
                                <h1 class="font-bold text-xl mb-2">{$LL.RemoveReviewStatusDialog()}</h1>
                                <p class="text-gray-400 text-sm">{$LL.RemoveReviewStatusDialogDesc()}</p>
                            </div>
                        </div>
                        <div class="flex justify-end gap-4 mt-5">
                            <button class="bg-gray-100 border border-gray-300 px-6 py-2 rounded text-black hover:bg-gray-200" on:click="{hideDialog}">{$LL.Cancel()}</button>
                            <button class="bg-red-500 px-6 py-2 rounded text-white hover:bg-red-700" on:click="{deleteElement}">{$LL.Delete()}</button>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    {/if}
</div>