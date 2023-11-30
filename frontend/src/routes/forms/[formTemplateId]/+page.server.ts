import { api } from "../../../api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    try {
        //Using the URL constructor to parse the URL
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)

        // Get last element of url, Id of the formTemplate
        const formTemplateId = pathSegments[pathSegments.length - 1]

        const [formTemplateResponse] = await Promise.all([
            api ("GET", `FormTemplates/${formTemplateId}`)
        ])

        let formTemplate = formTemplateResponse?.body
        return { formTemplate }

    } catch (ex) {
        throw ex
    }
}