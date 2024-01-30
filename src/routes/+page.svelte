<script>
    import LL from '../i18n/i18n-svelte'
    import Submissions from '$lib/components/Submissions.svelte'
    import Charts from '$lib/components/statistics/Charts.svelte'
    import ChartsOnlyText from '$lib/components/statistics/ChartsOnlyText.svelte'

    export let data

    let user = data.user
    let reviews = data.reviews
</script>

<svelte:head>
    <title>{$LL.PerformanceModule()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    {#if user?.profileType === "Frontoffice"}
        <div class="flex p-10">
            <Submissions {user} />
        </div>
    {:else if user?.profileType === "Backoffice"}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-y-5 justify-around justify-items-center">
            <ChartsOnlyText title={$LL.Sidebar.Forms()} number={0} />
            <ChartsOnlyText title={$LL.Sidebar.Reviews()} number={reviews.length || 0} />
            <ChartsOnlyText title={$LL.ActiveReviews()} number={reviews.filter((/** @type {{ reviewStatus: string; }} */ temp) => temp.reviewStatus === 'Active').length} backgroundColor={'bg-green-400'} borderColor={'border-green-500'} />
            <ChartsOnlyText title={$LL.CompletedReviews()} number={reviews.filter((/** @type {{ reviewStatus: string; }} */ temp) => temp.reviewStatus === 'Completed').length} backgroundColor={'bg-blue-400'} borderColor={'border-blue-500'} />
        </div>
        <Charts reviews={reviews.filter((/** @type {{ reviewStatus: string; }} */ temp) => temp.reviewStatus === 'Active')} /> 
    {/if}
</div>