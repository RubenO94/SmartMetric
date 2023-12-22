<script lang="ts">
    import { page } from '$app/stores'
    import LL from '../../i18n/i18n-svelte'
    import UserMenu from './UserMenu.svelte'
    import { fly } from 'svelte/transition'

    export let user: any

    const directories = [
        { name: "Reviews", icon: "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" }, 
        { name: "Forms", icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" }, 
        { name: "Statistics", icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" }
    ]

    const getTranslation = (directory: string) => {
        if (directory == "Reviews") return $LL.Sidebar.Reviews()
        if (directory == "Forms") return $LL.Sidebar.Forms()
        if (directory == "Statistics") return $LL.Sidebar.Statistics()
    }

</script>

<nav class="w-[300px] min-h-screen text-sm bg-gray-100 border-r-[1px] border-gray-300" transition:fly={{ delay: 0, duration: 100, x: -50 }}>
    <UserMenu bind:user={user} />
    <p class="font-semibold pt-4 pb-1 px-2">{$LL.Backoffice()}</p>
    <div class="flex flex-col gap-y-1 px-1 py-2">
        {#each directories as directory, index}
            <a href="/{directory.name.toLowerCase()}" class="flex flex-row gap-x-2 items-center hover:bg-gray-300 p-2 rounded-md {$page.url.pathname.split("/")[1].toLowerCase() === directory.name.toLowerCase() ? 'bg-gray-300' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="{directory.icon}" />
                </svg>
                <p class="font-normal text-sm">{getTranslation(directory.name)}</p>
                {#if $page.url.pathname.split("/")[1].toLowerCase() === directory.name.toLowerCase()}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                {/if}
            </a>
        {/each}
    </div>
</nav>