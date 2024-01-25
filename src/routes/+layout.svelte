<script lang="ts">
	import '../app.css'
	import LL from '../i18n/i18n-svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
	import Header from '$lib/components/Header.svelte'
	import { fly } from 'svelte/transition'
	import { type Icon, Clipboard, List, BarChartBig, Settings, X, ChevronRight, PenSquare } from 'lucide-svelte'
	import type { ComponentType } from 'svelte'
    import { page } from '$app/stores';

	export let data

	let user = data.user
	let sidebarVisible = false

	const menuItemsBackoffice: { name: string, label: string, permission: boolean, icon: ComponentType<Icon> }[] = [
		{ name: "Reviews", label: $LL.Sidebar.Reviews(), permission: false, icon: Clipboard },
		{ name: "Forms", label: $LL.Sidebar.Forms(), permission: false, icon: List },
		{ name: "Statistics", label: $LL.Sidebar.Statistics(), permission: false, icon: BarChartBig },
		{ name: "AdminSettings", label: $LL.Settings(), permission: false, icon: Settings },
	]

	const menuItemsFrontoffice: { name: string, label: string, permission: boolean, icon: ComponentType<Icon> }[] = [
        {
            name: "Submissions",
            label: $LL.Submissions.Name(),
            permission: false,
            icon: PenSquare
        }
    ]
	
	function toggleSidebar() { 
		sidebarVisible = !sidebarVisible 
	}

	function checkPermission(item: any) {
        let window = user?.authorizations.find((n: any) => n.windowType === item.name)
        let permission = window.permissions.find((p: any) => p.permissionType === "Read")
        item.permission = permission.hasPermission
        return item.permission
    }
</script>

<div class="flex w-full min-h-screen overflow-y-hidden">
	<div class="2xl:flex hidden">
		{#if sidebarVisible}
			<Sidebar bind:user={user} />
		{/if}
	</div>
	<div class="flex flex-col flex-1 overflow-y-hidden">
		{#if sidebarVisible}
			<div class="2xl:hidden fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen z-50">
				<div class="2xl:hidden absolute w-[250px] p-2 min-h-full border-r border-gray-300 bg-gray-100" transition:fly={{ delay: 0, duration: 100, x: -50 }}>
					<button on:click={toggleSidebar} class="absolute right-2 p-1 hover:bg-gray-300 hover:text-red-500 rounded">
						<svelte:component this={X} />
					</button>
					<div class="flex flex-col gap-y-1 px-1 py-5">
						{#if user?.profileType === 'Backoffice'}
							<p class="font-semibold text-center pt-4 pb-1 px-2">{$LL.Backoffice()}</p>
							<hr class="mx-10" />
							{#each menuItemsBackoffice as item}
								{#if checkPermission(item)}
									<a on:click={toggleSidebar} href="/{item.name.charAt(0).toLowerCase() + item.name.slice(1)}" class="flex flex-row gap-x-2 items-center hover:bg-gray-200 p-2 rounded {$page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase() ? 'bg-gray-200 font-medium' : ''}">
										<svelte:component this={item.icon} size={20} />
										<p class="text-sm">{item.label}</p>
										{#if $page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase()}
											<svelte:component this={ChevronRight} size={20} class="ml-auto" />
										{/if}
									</a>
								{/if}
							{/each}
						{:else if user?.profileType === 'Frontoffice'}
							<p class="font-semibold text-center pt-4 pb-1 px-2">{$LL.Frontoffice()}</p>
							<hr class="mx-10" />
							{#each menuItemsFrontoffice as item}
								<!-- {#if checkPermission(item)} -->
									<a on:click={toggleSidebar} href="/{item.name.toLowerCase()}" class="flex flex-row gap-x-2 items-center hover:bg-gray-200 p-2 rounded {$page.url.pathname.split("/")[1].toLowerCase() === item.name.toLowerCase() ? 'bg-gray-200 font-medium' : ''}">
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
				</div>
			</div>
		{/if}
		<Header {sidebarVisible} {toggleSidebar} />
		<div style="height:calc(100vh - 56px); overflow-y: auto; overflow-x: hidden">
			<slot />
		</div>
	</div>
</div>