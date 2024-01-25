<script lang="ts">
    import { api } from "$lib/api/_api"
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

<svelte:head>
    <title>{$LL.Settings()}</title>
</svelte:head>

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

    <div class="flex flex-col gap-y-20">
        {#await getPermissionOfProfile(profileChooseId)}
            <div class="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
            </div>
        {:then}
            <div class="flex flex-col gap-y-5">
                {#each profilePermissions as window}
                    <div class="flex flex-col gap-y-1">
                        <li class="text-black font-semibold">{window.windowType}</li>
                        <div class="flex flex-col md:flex-row justify-around gap-y-1">
                            {#each window.permissions as permission}
                                <div class="flex gap-x-2 justify-between">
                                    <p>{permission.permissionType}</p>
                                    <div class="flex-grow h-auto border-b-2 border-gray-300"></div>
                                    <label class="toggle">
                                        <input type="checkbox" bind:checked={permission.hasPermission}>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
            <button on:click={saveSettings} class="mx-auto border border-transparent p-2 rounded text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-950">{$LL.SaveChanges()}</button>
        {/await}
    </div>
</div>

<style>
    .toggle {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 22px;
    }
         
    /* Hide the checkbox input */
    .toggle input {
        display: none;
    }
         
    /* Describe slider's look and position. */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: gray;
        transition: .4s;
        border-radius: 34px;
    }
         
    /* Describe the white ball's location and appearance in the slider. */
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
         
    /* Modify the slider's background color to green once the checkbox has been selected. */
    input:checked+.slider {
        background-color: #3B82F6;
    }
         
    /* When the checkbox is checked, shift the white ball towards the right within the slider. */
    input:checked+.slider:before {
        transform: translateX(14px);
    }
</style>