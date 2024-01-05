<script lang="ts">
    import LL from '../../i18n/i18n-svelte'
    import UserMenu from './UserMenu.svelte'
    import { page } from '$app/stores'
    import { fly } from 'svelte/transition'
    import { type Icon, Clipboard, List, BarChartBig, ChevronRight } from 'lucide-svelte'
    import type { ComponentType } from 'svelte'

    export let user: any

    const menuItems: { name: string, label: string, permission: boolean, icon: ComponentType<Icon> }[] = [
        { 
            name: "reviews", 
            label: $LL.Sidebar.Reviews(),
            permission: user.authorizations[1].permissions[1].hasPermission,
            icon: Clipboard
        }, 
        { 
            name: "forms", 
            label: $LL.Sidebar.Forms(),
            permission: user.authorizations[0].permissions[1].hasPermission,
            icon: List
        }, 
        { 
            name: "statistics", 
            label: $LL.Sidebar.Statistics(),
            permission: user.authorizations[2].permissions[1].hasPermission,
            icon: BarChartBig
        }
    ]
</script>

<nav class="hidden xl:flex flex-col w-[250px] min-h-screen text-sm bg-gray-100 border-r-[1px] border-gray-300" transition:fly={{ delay: 0, duration: 200, x: -50 }}>
    <UserMenu bind:user={user} />
    <div class="flex flex-col gap-y-1 px-1 py-2">
        <p class="font-semibold text-center pt-4 pb-1 px-2">{$LL.Backoffice()}</p>
        <hr class="mx-10" />
        {#each menuItems as item}
            {#if item.permission}
                <a href="/{item.name}" class="flex flex-row gap-x-2 items-center hover:bg-gray-300 p-2 rounded {$page.url.pathname.split("/")[1].toLowerCase() === item.name ? 'bg-gray-300' : ''}">
                    <svelte:component this={item.icon} size={20} />
                    <p class="text-sm">{item.label}</p>
                    {#if $page.url.pathname.split("/")[1].toLowerCase() === item.name}
                        <svelte:component this={ChevronRight} size={20} class="ml-auto" />
                    {/if}
                </a>
            {/if}
        {/each}
    </div>
</nav>