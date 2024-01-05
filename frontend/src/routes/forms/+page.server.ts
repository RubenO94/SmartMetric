import { goto } from "$app/navigation"
import { api } from "$lib/api/_api"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

// Get templates
export const load: PageServerLoad = async ( event ) => {    
    const pageNumber = Number(event.url.searchParams.get('page')) || 1
    const pageSize = Number(event.url.searchParams.get('pageSize')) || 20
    try {
        const lang = event.locals.lang[0].slice(0, 2)
        const [formTemplatesResponse] = await Promise.all([
            api ("GET", `FormTemplates?page=${pageNumber}&pageSize=${pageSize}&language=${lang}`)
        ])

        let formTemplates = formTemplatesResponse?.body
        let total = formTemplatesResponse?.total
        return { formTemplates, total, pageSize, pageNumber }
    } catch (ex) {
        throw ex
    }
}