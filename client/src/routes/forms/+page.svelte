<script>
    import ReviewsTemplateTable from '$lib/tables/ReviewsTemplateTable.svelte';
	import { i } from '@inlang/sdk-js';
</script>

<div class="bg-gray-100">
    <div class="w-auto flex">
        <div class="w-[900px] flex flex-col m-10">
            <div class="w-full h-full flex flex-col">
                <div class="bg-green-600 w-full h-24 flex items-center justify-end p-10 rounded-t-2xl">
                    <button class="border-2 border-white text-white text-xs font-semibold py-1 px-4 hover:bg-white hover:text-green-600 rounded-3xl">
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                            {i('ButtonModelsCreation')}
                        </div>
                    </button>
                </div>
                <div class="bg-white w-full h-5/6 flex flex-col rounded-b-lg shadow-xl">
                    <div class="flex flex-col p-10 gap-2 text-center">
                        <p class="font-semibold text-lg max-h-8">{i('TitleModels')}</p>
                        <p class="text-gray-500 text-sm max-h-8">{i('DescriptionModels')}</p>
                    </div>
                    <div class="h-full flex items-center justify-center">
                        <ReviewsTemplateTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>