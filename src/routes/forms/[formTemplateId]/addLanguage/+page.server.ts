import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { api } from "$lib/api/_api";

export const load: PageServerLoad = async ({url, locals}) => {
    try {
        const window = locals.user?.authorizations.find((n: any) => n.windowType === "Forms")
        const permission = window.permissions.find((p: any) => p.permissionType === "Update")
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }

        //Using the URL constructor to parse the URL
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)
        const formTemplateId = pathSegments[pathSegments.length - 2]

        const [formTemplateResponse] = await Promise.all([
            api ("GET", `FormTemplates/${formTemplateId}`)
        ])

        let formTemplate = formTemplateResponse?.body
        return { formTemplate }
        
    } catch (error) {
        throw error
    }
}