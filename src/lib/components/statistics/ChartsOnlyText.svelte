<script lang="ts">
    export let title: string
    export let number: number
    export let backgroundColor: string = 'bg-gray-100'
    export let borderColor: string = 'border-gray-300'
</script>

<div class="w-60 h-32 flex flex-col justify-center items-center gap-y-1 py-1 shadow-md rounded-md border {borderColor} {backgroundColor}">
    <p class="font-bold text-3xl">{number}</p>
    <p>{title}</p>
</div>