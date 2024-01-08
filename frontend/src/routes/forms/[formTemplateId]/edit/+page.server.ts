import { api } from "$lib/api/_api"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals }) => {
    try {
        const window = locals.user?.authorizations.find((n: any) => n.windowType === "Forms")
        const permission = window.permissions.find((p: any) => p.permissionType === "Update")
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }

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