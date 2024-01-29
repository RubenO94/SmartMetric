<script>
    import LL from '../i18n/i18n-svelte'
    import Submissions from '$lib/components/Submissions.svelte'

    export let data

    let user = data.user
</script>

<svelte:head>
    <title>{$LL.PerformanceModule()}</title>
</svelte:head>

<div class="mx-auto flex flex-col items-center xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    {#if user?.profileType === "Frontoffice"}
        <div class="flex p-10">
            <Submissions {user} />
        </div>
    {:else if user?.profileType === "Backoffice"}
        <p>Backoffice</p>
    {/if}
</div>