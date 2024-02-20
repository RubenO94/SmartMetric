<script lang="ts">
    import LL from '../i18n/i18n-svelte'
    import { Clipboard, ClipboardCheck, Clock, List } from 'lucide-svelte'
    import Charts from '$lib/components/statistics/Charts.svelte'
    import ChartsOnlyText from '$lib/components/statistics/ChartsOnlyText.svelte'
    import Dashboard from '$lib/components/Dashboard.svelte'
    import LineChart from '$lib/components/statistics/LineChart.svelte'
    import RatingReviews from '$lib/components/RatingReviews.svelte'
    import ReviewsStatusChart from '$lib/components/statistics/ReviewsStatusChart.svelte'

    export let data

    let user = data.user
    let submissions = data.submissions || []
    let reviews = data.reviews || []
    let totalForms = data.totalForms || 0
    let activeReviews = reviews.filter((temp: any) => temp.reviewStatus === 'Active') || []
    let completedReviews = reviews.filter((temp: any) => temp.reviewStatus === 'Completed') || []
</script>

<svelte:head>
    <title>{$LL.PerformanceModule()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    {#if user?.profileType === "Frontoffice"}
        <div class="flex flex-col md:flex-row gap-x-10 gap-y-10">
            <Dashboard {user} />
            <div class="flex flex-col w-3/4 gap-y-10">
                <div class="flex flex-col xl:flex-row w-full justify-between gap-x-5 overflow-hidden">
                    <RatingReviews {submissions} reviews={completedReviews} />
                    <LineChart {submissions} reviews={completedReviews} />
                </div>
            </div>
        </div>
    {:else if user?.profileType === "Backoffice"}
        <div class="w-full box-border grid grid-cols-1 xl:grid-cols-2 gap-[10px] md:gap-[25px] xl:gap-[50px]">
            <div class="w-full box-border grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[25px] xl:gap-[50px]">
                <ChartsOnlyText backgroundColor={'#F1C40F'} icon={List} number={totalForms} title={$LL.Sidebar.Forms()} />
                <ChartsOnlyText backgroundColor={'#EA4ABC'} icon={Clipboard} number={reviews.length || 0} title={$LL.Sidebar.Reviews()} />
            </div>
            <div class="w-full box-border grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[25px] xl:gap-[50px]">
                <ChartsOnlyText backgroundColor={'#4ADE80'} icon={Clock} number={activeReviews.length} title={$LL.ActiveReviews()} />
                <ChartsOnlyText backgroundColor={'#60a5fa'} icon={ClipboardCheck} number={completedReviews.length} title={$LL.CompletedReviews()} />
            </div>
            <div class="w-full box-border grid grid-cols-1 gap-[10px] md:gap-[25px] xl:gap-[50px]">
                <ReviewsStatusChart {reviews} />
            </div>
            <div class="w-full box-border grid grid-cols-1 gap-[10px] md:gap-[25px] xl:gap-[50px]">
                <Charts reviews={activeReviews} />
            </div>
        </div>
    {/if}
</div>