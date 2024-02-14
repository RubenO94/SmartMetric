<script>
    import { Accordion, AccordionItem } from 'flowbite-svelte'
    import { ChevronDown, ChevronUp } from 'lucide-svelte'
    import LL from '../../i18n/i18n-svelte'

    export let data
    let reviews = data.reviews
</script>

<div class="mx-auto flex md:flex-row xl:w-[1280px] py-5 md:px-5 px-2 md:gap-y-10 gap-y-5">
    <div class="flex flex-col w-2/5 gap-y-5">
        <p>{$LL.Sidebar.Reviews()}</p>
        <Accordion>
            {#each reviews as review}
                <AccordionItem>
                    <span slot="header">{review.translations[0].title}</span>
                    <div slot="arrowup">
                        <ChevronUp class="h-5 w-5" />
                    </div>
                    <div slot="arrowdown">
                        <ChevronDown class="h-5 w-5" />
                    </div>
                </AccordionItem>
            {/each}
        </Accordion>
    </div>
    <div class="w-3/5">
        <p>Parte 2</p>
    </div>
</div>