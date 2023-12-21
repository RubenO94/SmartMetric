<script>
    export let data

    let review = data.review
    let pageSelected = 'details'
    console.log(review)
</script>

<svelte:head>
    <title>{review.translations[0].title}</title>
</svelte:head>

<header class="flex flex-row gap-x-4 items-center justify-center px-10 py-2 text-sm border-b-[1px] border-gray-300">
    <div class="flex">
        <p>Details</p>
    </div>
</header>
<!-- <div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-5">
    <p>djhahb</p>
</div> -->