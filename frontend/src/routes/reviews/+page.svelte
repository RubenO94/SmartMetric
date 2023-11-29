<script>
    import { LL, locale } from "../../i18n/i18n-svelte";
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10">
    <div class="flex justify-between">
        <h1 class="font-semibold text-2xl">{ $LL.Sidebar.Reviews() }</h1>
        <a href="/reviews/createReview" class="flex flex-row items-center gap-x-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer border hover:bg-blue-700 hover:border-blue-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            { $LL.ReviewButton() }
        </a>
    </div>
    <!-- Search Bar -->
    <!-- Table list of reviews -->
</div>