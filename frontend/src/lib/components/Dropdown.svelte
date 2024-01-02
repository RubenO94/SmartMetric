<script lang="ts">
    import { goto } from "$app/navigation"
    import { api } from "$lib/api/_api"
    import toast, { Toaster } from "svelte-french-toast"
    import LL from "../../i18n/i18n-svelte"
    import { PlusCircle, Pencil, Trash2, MoreHorizontal, XCircle } from 'lucide-svelte'

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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative text-xs" on:mouseleave={unToggleDropdown}>
    <button class="cursor-pointer focus:outline-none" on:click={toggleDropdown}>
        <svelte:component this={MoreHorizontal} />
    </button>

    {#if isOpen}
        <div id="menuDropdown" class="absolute -left-5 p-2 bg-gray-50 border border-gray-300 shadow-md rounded-lg">
            <ul class="flex flex-col">
                <button class="cursor-pointer whitespace-nowrap flex items-center gap-x-2" on:click={() => goto(`/`)}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svelte:component this={PlusCircle} />            
                        {$LL.AddLanguage()}
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => goToEditPage()}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svelte:component this={Pencil} />                     
                        {$LL.Edit()}
                    </p>
                </button>
                <button class="cursor-pointer whitespace-nowrap" on:click={() => showDialog()}>
                    <p class="flex items-center hover:bg-blue-500 hover:text-white py-2 px-4 gap-x-2 rounded-lg">
                        <svelte:component this={Trash2} />                          
                        {$LL.Delete()}
                    </p>
                </button>

                <div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
                    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-2/5 flex flex-col gap-y-5">
                        <div class="flex items-center gap-5">
                            <div class="bg-red-200 text-red-500 flex items-center justify-center w-10 h-10 p-5 rounded-full">
                                <p>
                                    <svelte:component this={XCircle} />                                                                         
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