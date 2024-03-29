import { api } from "$lib/api/_api"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        //Check permission of backoffice
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms")
        const permission = window.permissions.find((p: any) => p.permissionType === "Update")
        if (!permission.hasPermission) throw redirect(302, "/")

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