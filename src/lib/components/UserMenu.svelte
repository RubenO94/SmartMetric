<script lang="ts">
    import { Settings } from "lucide-svelte";
    import LL from "../../i18n/i18n-svelte"

    export let user: any

    function checkPermission(string: string) {
        let window = user.authorizations.find((m: any) => m.windowType == "AdminSettings")
        let permission = window.permissions.find((n: any) => n.permissionType == string)
        return permission.hasPermission
    }
</script>

<div class="flex flex-col gap-y-4 bg-gray-200 h-auto p-2 pb-5">
    <!-- Go Back button -->
    <div class="flex flex-row gap-x-2">
        <div class="relative inline-block group">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 hover:bg-black hover:text-white rounded">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </a>
            <div class="absolute w-max top-0 left-full mt-2 ml-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">{$LL.ButtonExitModule()}</div>
        </div> 
    </div>
    <!-- Image and Text -->
    <div class="flex flex-row gap-x-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-16 h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div class="flex flex-col justify-center">
            <p class="font-semibold">{$LL.Hello()},</p>
            <p class="line-clamp-1">
                {#if user && user.userName}
                    {user.userName}
                {:else}
                    {$LL.User()}
                {/if}
            </p>
        </div>
    </div>
    <!-- Other Buttons (Ex: Settings) -->
    <!-- <div class="flex flex-row gap-x-2">
        {#if checkPermission("Read")}
            <div class="relative inline-block group">
                <a href="/adminSettings" class="flex justify-center rounded px-2 py-1 border border-transparent hover:bg-gray-300">
                    <svelte:component this={Settings} />
                </a>
                <div class="absolute w-max top-0 left-full mt-2 ml-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">{$LL.Settings()}</div>
            </div>
        {/if}
    </div> -->
</div>