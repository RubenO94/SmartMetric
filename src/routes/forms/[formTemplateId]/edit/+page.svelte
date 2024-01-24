<script lang="ts">
    import { page } from "$app/stores"
    import FormComponent from "$lib/components/FormComponent.svelte";
    import { FileEdit } from "lucide-svelte";
    import LL from "../../../../i18n/i18n-svelte"

    export let data

    let formTemplate = data.formTemplate
    let action = 'edit'
</script>

<svelte:head>
    <title>{$LL.EditFormButton()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-5">
    <div class="flex flex-col md:flex-row gap-x-4 items-center text-blue-500">
        <div class="block">
            <svelte:component this={FileEdit} size="90" />
        </div>
        <div class="flex flex-col gap-y-2">
            <h1 class="text-center md:text-left font-semibold text-lg md:text-xl">{ $LL.EditFormModel() }</h1>
            <p class="text-black text-xs md:text-sm">{ $LL.EditFormModelDescription() }</p>
        </div>
    </div>

    <FormComponent {formTemplate} {action} addLangs={[]} />
</div>