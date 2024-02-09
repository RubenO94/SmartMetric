<script lang="ts">
    import { Accordion, AccordionItem } from "flowbite-svelte"
    import { ChevronDown, ChevronUp, Folder, User } from "lucide-svelte"

    export let employees: any
</script>

    <Accordion>
        {#each employees as employee, i}
            <AccordionItem class="p-[10px] {i == 0 ? 'rounded-t' : ''}">
                <span slot="header" class="flex gap-x-2">
                    <Folder class="text-gray-500" />
                    {employee.employeeName}
                </span>

                <!-- Arrow for accordion -->
                <div slot="arrowup"><ChevronUp class="h-5 w-5" /></div>
                <div slot="arrowdown"><ChevronDown class="h-5 w-5" /></div>
                <!-- ******************* -->

                <!-- Grafico -->
            </AccordionItem>
        {/each}
    </Accordion>