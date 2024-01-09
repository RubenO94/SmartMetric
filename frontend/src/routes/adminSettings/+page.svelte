<script lang="ts">
    import { api } from "$lib/api/_api";
    import { onMount } from "svelte";
    import LL from "../../i18n/i18n-svelte"
    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";

    export let data

    const profiles = data.profiles
    let profileChooseId: number = profiles[0].idperfil
    let profilePermissions: any

    async function getPermissionOfProfile(id: number) {
        const [profilePermissionsResponse] = await Promise.all([
            api("GET", `Admin/${id}/Permissions`)
        ])
        profilePermissions = profilePermissionsResponse?.body
    }

    async function saveSettings() {
        let permissionsGranted: number[] = []
        profilePermissions.forEach((window: any) => {
            window.permissions.forEach((permission: any) => {
                if (permission.hasPermission) {
                    permissionsGranted = [...permissionsGranted, permission.permissionId]
                }
            })
        });
        const [savePermissions] = await Promise.all([
            api("POST", `Admin/${profileChooseId}/Permissions`, permissionsGranted)
        ])
        if(typeof savePermissions?.status !== 'undefined') {
            goto("/")
        } else {
            toast.error("Error")
        }
    }
</script>

<Toaster />

<div class="mx-auto flex flex-col xl:w-[1280px] p-5 gap-y-10">
    <h1 class="font-semibold text-2xl mx-auto md:mx-0">{ $LL.AdminSettings() }</h1>

    <div class="flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-1">
            <p class="text-black text-base font-semibold">{$LL.ChooseProfile()}</p>
            <p class="text-xs text-gray-400">{$LL.ChooseProfileDesc()}</p>
        </div>
        {#if profiles.length > 0}
            <select bind:value={profileChooseId} class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2">
                {#each profiles as profile}
                    <option value={profile.idperfil}>{profile.idperfil} - {profile.nome}</option>
                {/each}
            </select>
        {/if}
    </div>

    <div class="flex flex-col gap-y-5">
    {#await getPermissionOfProfile(profileChooseId)}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
    {:then}
        {#each profilePermissions as window}
            <div class="flex flex-col gap-y-1">
                <li class="text-black font-semibold">{window.windowType}</li>
                <div class="flex gap-x-5">
                    {#each window.permissions as permission}
                        <div class="flex gap-x-1">
                            <p>{permission.permissionType}</p>
                            <input type="checkbox" bind:checked={permission.hasPermission} />
                        </div>
                        |
                    {/each}
                </div>
            </div>
        {/each}
    {/await}
    </div>

    <button on:click={saveSettings} class="mx-auto border border-transparent p-2 rounded text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-950">{$LL.SaveChanges()}</button>
</div>