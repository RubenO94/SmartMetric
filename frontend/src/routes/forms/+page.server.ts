import { api } from "$lib/api/_api"
import type { PageServerLoad } from "./$types"

// Get templates
export const load: PageServerLoad = async ( event ) => {
    try {
        const lang = event.locals.lang[0].slice(0, 2)
        const [formTemplatesResponse] = await Promise.all([
            api ("GET", `FormTemplates?page=1&pageSize=20&language=` + lang)
        ])

        let formTemplates = formTemplatesResponse?.body
        return { formTemplates }
    } catch (ex) {
        throw ex
    }
}