<script lang="ts">
    import { CircleUserRound } from "lucide-svelte"
    import LL from "../../i18n/i18n-svelte"

    export let user: any
</script>

<div class="flex flex-col gap-y-4 bg-gray-200 h-auto px-2 py-5">
    <!-- Go Back button -->
    <!-- <div class="flex flex-row gap-x-2">
        <div class="relative inline-block group">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 hover:bg-black hover:text-white rounded">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </a>
            <div class="absolute w-max top-0 left-full mt-2 ml-2 p-2 bg-gray-800 text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">{$LL.ButtonExitModule()}</div>
        </div> 
    </div> -->
    <!-- Image and Text -->
    <div class="flex flex-row gap-x-2 items-center">
        <CircleUserRound class="w-16 h-16" strokeWidth={1.5} />
        <div class="flex flex-col justify-center">
            <p class="font-semibold">{$LL.Hello()},</p>
            <p class="line-clamp-1">
                {#if user && user.userName}
                    <p title="{user.userName}">{user.userName}</p>
                {:else}
                    <p>{$LL.User()}</p>
                {/if}
            </p>
        </div>
    </div>
</div>