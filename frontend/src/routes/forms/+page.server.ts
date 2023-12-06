import { api } from "$lib/api/_api"
import type { Actions, PageServerLoad } from "./$types"

// Get templates
export const load: PageServerLoad = async () => {
    try {
        const [formTemplatesResponse] = await Promise.all([
            api ("GET", `FormTemplates`)
        ])

        let formTemplates = formTemplatesResponse?.body
        return { formTemplates }

    } catch (ex) {
        throw ex
    }
}

// post templates
export const actions: Actions = {
    
}