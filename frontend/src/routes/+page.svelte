<script>
    import { goto } from '$app/navigation';
    import Submissions from '$lib/components/Submissions.svelte'

    export let data

    let user = data.user
</script>

{#if user?.profileType === "Frontoffice"}
    <div class="flex justify-end p-10">
        <Submissions {user} />
    </div>
{:else if user?.profileType === "Backoffice"}
    <p>Backoffice</p>
{/if}