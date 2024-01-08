<script lang="ts">
    import { goto } from "$app/navigation"
    import { api } from "$lib/api/_api"
    import toast from "svelte-french-toast"
    import LL from "../../i18n/i18n-svelte"
    import { PlusCircle, Pencil, Trash2, MoreHorizontal, XCircle } from 'lucide-svelte'
    import { Dropdown, DropdownItem } from "flowbite-svelte"

    export let object: any
    export let user: User | null
    
    let isOpen = false

    function toggleDropdown() { isOpen = !isOpen }
    function unToggleDropdown() { isOpen = false }

    function goToEditPage() {
        if (object.formTemplateId) goto(`/forms/${object.formTemplateId}/edit`)
        else if (object.reviewId) goto(`/reviews/${object.reviewId}/edit`)
    }

    function showDialog() {
        isOpen = false
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

    function checkPermission(typeOfPermission: string) {
        let window = object.formTemplateId ? user?.authorizations.find((n: any) => n.windowType == 'Forms') : user?.authorizations.find((n) => n.windowType == 'Reviews')
        let permission = window.permissions.find((p: any) => p.permissionType === typeOfPermission)
        return permission.hasPermission
    }
</script>

<!-- Dialog -->
<div id="dialog" class="fixed left-0 top-0 bg-black bg-opacity-75 hidden w-screen h-screen transition-opacity duration-500">
    <div class="bg-white rounded shadow-md p-8 mx-auto my-20 w-4/5 lg:w-3/5 xl:w-2/5">
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

{#if checkPermission('Update') || checkPermission('Delete')}
    <div class="relative group items-center text-xs">
        <button class="cursor-pointer">
            <svelte:component this={MoreHorizontal} strokeWidth="1.5" />
        </button>

        <Dropdown bind:open={isOpen} class="border border-gray-300 rounded p-1">
            {#if checkPermission('Update')}
                <DropdownItem on:click={() => goto('/')} class="flex items-center gap-x-2 whitespace-nowrap rounded hover:bg-blue-500 hover:text-white">
                    <svelte:component this={PlusCircle} size="20" />
                    {$LL.AddLanguage()}
                </DropdownItem>
                <DropdownItem on:click={() => goToEditPage()} class="flex items-center gap-x-2 whitespace-nowrap rounded hover:bg-blue-500 hover:text-white">
                    <svelte:component this={Pencil} size="20" />
                    {$LL.Edit()}
                </DropdownItem>
            {/if}
            {#if checkPermission('Delete')}
                <DropdownItem on:click={() => showDialog()} class="flex items-center gap-x-2 whitespace-nowrap rounded hover:bg-blue-500 hover:text-white">
                    <svelte:component this={Trash2} size="20" />
                    {$LL.Delete()}
                </DropdownItem>
            {/if}
        </Dropdown>
    </div>
{/if}