<script>
    import LL from "../../i18n/i18n-svelte";
</script>

<svelte:head>
    <title>{$LL.Sidebar.Statistics()}</title>
</svelte:head>

<div class="mx-auto flex flex-col w-[1200px] p-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl">{ $LL.Sidebar.Statistics() }</h1>
    </div>
</div>