<script lang="ts">
    import type { Icon }  from "lucide-svelte";
    import type { ComponentType } from "svelte";

    export let backgroundColor: string = '#F3F4F6'
    export let icon: ComponentType<Icon>
    export let number: number
    export let textColor = 'black'
    export let title: string
</script>

<div id="numbers" style="--backgroundColor: {backgroundColor}; --textColor: {textColor}">
    <p class="absolute left-[20px] top-[10px] font-semibold text-lg">{number}</p>
    <p class="absolute bottom-[10px] left-[20px] font-semibold text-lg">{title}</p>
    <svelte:component class="absolute right-[20px] top-[10px]" this={icon} />
</div>

<style>
    #numbers {
        background-color: var(--backgroundColor);
        border: 1px solid #000;
        border-radius: 10px;
        color: var(--textColor);
        display: inline-block;
        height: 75px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        position: relative;
    }
</style>