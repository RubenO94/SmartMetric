<script>
    import Sidebar from '$lib/sidebar/Sidebar.svelte'
    import { i } from '@inlang/sdk-js';
</script>

<div class="bg-gray-100">
    <div class="w-auto flex justify-center">
        <Sidebar activePage={"Statistics"} />
        <div class="w-[900px] flex flex-col m-10">
            <p class="text-center">{i('ComingSoon')}</p>
        </div>
    </div>
</div>