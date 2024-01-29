<script>
    import LL from "../../i18n/i18n-svelte";
</script>

<svelte:head>
    <title>{$LL.Sidebar.Statistics()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] p-5">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.Sidebar.Statistics() }</h1>
    </div>    
</div>