import { api } from "$lib/api/_api"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
    try {
        const parsedUrl = new URL(url)
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
    
        const formTemplateId = pathSegments[pathSegments.length - 2]
    
        const [formTemplateResponse] = await Promise.all([
            api ("GET", `FormTemplates/${formTemplateId}`)
        ])
    
        let formTemplate = formTemplateResponse?.body
        return { formTemplate }
    } catch (ex) {
        throw ex
    }
}