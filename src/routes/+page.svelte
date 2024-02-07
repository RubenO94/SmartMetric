<script lang="ts">
    import LL from '../i18n/i18n-svelte'
    import Charts from '$lib/components/statistics/Charts.svelte'
    import ChartsOnlyText from '$lib/components/statistics/ChartsOnlyText.svelte'
    import Dashboard from '$lib/components/Dashboard.svelte';
    import { Clipboard, ClipboardCheck, Clock, List } from 'lucide-svelte'
    import ReviewsStatusChart from '$lib/components/statistics/ReviewsStatusChart.svelte';

    export let data

    let user = data.user
    let reviews = data.reviews
    let activeReviews = reviews.filter((temp: any) => temp.reviewStatus === 'Active')
    let completedReviews = reviews.filter((temp: any) => temp.reviewStatus === 'Completed')
</script>

<svelte:head>
    <title>{$LL.PerformanceModule()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    {#if user?.profileType === "Frontoffice"}
        <div class="flex gap-x-5">
            <Dashboard {user} />
            <p>Outro lado...</p>
        </div>
    {:else if user?.profileType === "Backoffice"}
        <div class="w-full box-border grid grid-cols-1 xl:grid-cols-2 gap-[10px] md:gap-[25px] xl:gap-[50px]">
            <div class="w-full box-border grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[25px] xl:gap-[50px]">
                <ChartsOnlyText backgroundColor={'#F1C40F'} icon={List} number={0} title={$LL.Sidebar.Forms()} />
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