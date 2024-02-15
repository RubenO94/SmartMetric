<script lang="ts">
    import LL from '../../i18n/i18n-svelte'
    import UserMenu from './UserMenu.svelte'
    import { page } from '$app/stores'
    import { fly } from 'svelte/transition'
    import { type Icon, Clipboard, List, BarChartBig, ChevronRight, Settings, PenSquare, ActivitySquare } from 'lucide-svelte'
    import type { ComponentType } from 'svelte'

    export let user: any

    const menuItemsBackoffice: { name: string, label: string, permission: boolean, icon: ComponentType<Icon> }[] = [
        { 
            name: "Reviews", 
            label: $LL.Sidebar.Reviews(),
            permission: false,
            icon: Clipboard
        },
        { 
            name: "Forms", 
            label: $LL.Sidebar.Forms(),
            permission: false,
            icon: List
        },
        {
            name: "Statistics", 
            label: $LL.Sidebar.Statistics(),
            permission: false,
            icon: BarChartBig
        },
        {
            name: "AdminSettings",
            label: $LL.Permissions(),
            permission: false,
            icon: Settings
        }
    ]

    const menuItemsFrontoffice: { name: string, label: string, permission: boolean, icon: ComponentType<Icon> }[] = [
        {
            name: "Submissions",
            label: $LL.Submissions.Name(),
            permission: false,
            icon: PenSquare
        },
        {
            name: "Performance",
            label: $LL.Performance(),
            permission: false,
            icon: ActivitySquare
        }
    ]

    function checkPermission(item: any) {
        let window = user?.authorizations.find((n: any) => n.windowType === item.name)
        let permission = window.permissions.find((p: any) => p.permissionType === "Read")
        item.permission = permission.hasPermission
        return item.permission
    }
</script>

<nav class="hidden xl:flex flex-col w-[250px] min-h-screen text-sm bg-gray-100 border-r-[1px] border-gray-300" transition:fly={{ delay: 0, duration: 200, x: -50 }}>
    <UserMenu bind:user={user} />
    <div class="flex flex-col gap-y-1 px-1 py-2">
        {#if user.profileType === 'Backoffice'}
            <p class="font-semibold text-center pt-4 pb-1 px-2">{$LL.Backoffice()}</p>
            <hr class="mx-10" />
            {#each menuItemsBackoffice as item}
                {#if checkPermission(item)}
                    <a href="/{item.name.charAt(0).toLowerCase() + item.name.slice(1)}" class="flex flex-row gap-x-2 items-center hover:bg-gray-200 p-2 rounded {$page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase() ? 'bg-gray-200 font-medium' : ''}">
                        <svelte:component this={item.icon} size={20} />
                        <p class="text-sm">{item.label}</p>
                        {#if $page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase()}
                            <svelte:component this={ChevronRight} size={20} class="ml-auto" />
                        {/if}
                    </a>
                {/if}
            {/each}
        {:else if user.profileType === 'Frontoffice'}
            <p class="font-semibold text-center pt-4 pb-1 px-2">{$LL.Frontoffice()}</p>
            <hr class="mx-10" />
            {#each menuItemsFrontoffice as item}
                <!-- {#if checkPermission(item)} -->
                    <a href="/{item.name.toLowerCase()}" class="flex flex-row gap-x-2 items-center hover:bg-gray-200 p-2 rounded {$page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase() ? 'bg-gray-200 font-medium' : ''}">
                        <svelte:component this={item.icon} size={20} />
                        <p class="text-sm">{item.label}</p>
                        {#if $page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase()}
                            <svelte:component this={ChevronRight} size={20} class="ml-auto" />
                        {/if}
                    </a>
                <!-- {/if} -->
            {/each}
        {/if}
    </div>
</nav>