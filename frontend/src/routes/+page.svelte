<script>
    export let data

    let user = data.user
</script>

{#if user?.profileType === "Frontoffice"}
    <p>Frontoffice</p>
{:else if user?.profileType === "backoffice"}
    <p>Backoffice</p>
{/if}