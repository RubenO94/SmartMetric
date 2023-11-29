<script lang="ts">
    import { page } from '$app/stores'
    import { i, languages, switchLanguage } from '@inlang/sdk-js'

    let activePage: string

    const pages = ["Reviews", "Statistics", "Forms"]
    const icons = [
        "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184",
        "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
        "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
    ]
</script>

<nav class="h-screen w-64 flex flex-col">
    <div class="h-1/4 flex flex-col items-center justify-center">
        <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </a>
    </div>
    <div class="h-2/4 flex flex-col items-center gap-y-1">
        {#each pages as page, index}
            <a class:active={$page.url.searchParams.get("type") ===  page} href={`/${page.toLowerCase()}`} class="flex items-center gap-x-2 p-3 w-60 rounded-xl font-semibold text-black hover:text-white hover:bg-green-600 {activePage === page ? 'bg-green-600 text-white' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="{icons[index]}" />
                </svg>
                {i(page)}
                {#if activePage === page}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                {/if}
            </a>
        {/each}
    </div>
    <div class="flex flex-col items-center">
        {#each languages as lang}
            <button on:click={() => switchLanguage(lang)}>{lang.toUpperCase()}</button>
        {/each}
    </div>
</nav>