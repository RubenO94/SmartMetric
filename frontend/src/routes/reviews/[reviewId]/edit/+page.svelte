<script>
    import EditReview from "$lib/components/EditReview.svelte"
    import LL from "../../../../i18n/i18n-svelte"

    export let data

    let review = data.review
    let steps = [
        { text: $LL.Details() },
        { text: $LL.Departments() },
        { text: $LL.Questions() },
        { text: $LL.Finalize() }
    ]
</script>

<div class="mx-auto flex flex-col w-[1200px] p-10 gap-y-5">
    <EditReview {steps} {review} />
</div>