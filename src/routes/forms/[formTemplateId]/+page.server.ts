import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user } = await parent()
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms")
        const permission = window.permissions.find((p: any) => p.permissionType === "Read")
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }

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