import { api } from "../../api/_api"
import type { PageServerLoad } from "./$types"

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