<script lang="ts">
    import LL from '../i18n/i18n-svelte'
    import Submissions from '$lib/components/Submissions.svelte'
    import Charts from '$lib/components/statistics/Charts.svelte'
    import ChartsOnlyText from '$lib/components/statistics/ChartsOnlyText.svelte'
    import { Clipboard, ClipboardCheck, Clock, List } from 'lucide-svelte'

    export let data

    let user = data.user
    let reviews = data.reviews
    let activeReviews = reviews.filter((temp: any) => temp.reviewStatus === 'Active').length
    let completedReviews = reviews.filter((temp: any) => temp.reviewStatus === 'Completed').length
</script>

<svelte:head>
    <title>{$LL.PerformanceModule()}</title>
</svelte:head>

<div class="mx-auto flex flex-col xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    {#if user?.profileType === "Frontoffice"}
        <div class="flex gap-x-5">
            <div>
                <div class="flex gap-x-2">
                    <p class="p-2 border-b-2 border-blue-500">My Submissions</p>
                    <p class="p-2">My Departments</p> 
                </div>
                
            </div>
            <div class="flex p-10">
                <Submissions {user} />
            </div>
        </div>
        
    {:else if user?.profileType === "Backoffice"}
        <div class="w-full box-border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[10px] md:gap-[25px] xl:gap-[50px]">
            <ChartsOnlyText backgroundColor={'#F1C40F'} icon={List} number={0} title={$LL.Sidebar.Forms()} />
            <ChartsOnlyText backgroundColor={'#7D3C98'} icon={Clipboard} number={reviews.length || 0} textColor={'white'} title={$LL.Sidebar.Reviews()} />
            <ChartsOnlyText backgroundColor={'#4ADE80'} icon={Clock} number={activeReviews} title={$LL.ActiveReviews()} />
            <ChartsOnlyText backgroundColor={'#60a5fa'} icon={ClipboardCheck} number={completedReviews} textColor={'white'} title={$LL.CompletedReviews()} />
        </div>
    {/if}
</div>

<!-- Chart of active reviews -->
<!-- <Charts reviews={reviews.filter((/** @type {{ reviewStatus: string; }} */ temp) => temp.reviewStatus === 'Active')} />   -->