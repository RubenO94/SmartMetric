import { api } from "$lib/api/_api"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

// Get templates
export const load: PageServerLoad = async ( event ) => {
    const pageNumber = Number(event.url.searchParams.get('page')) || 1
    try {
        const window = event.locals.user?.authorizations.find((n: any) => n.windowType === "Forms");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
        const lang = event.locals.lang[0].slice(0, 2)
        const [formTemplatesResponse] = await Promise.all([
            api ("GET", `FormTemplates?page=${pageNumber}&pageSize=20`)
        ])

        let formTemplates = formTemplatesResponse?.body
        let total = formTemplatesResponse?.total
        return { formTemplates, total, pageNumber }
    } catch (ex) {
        throw ex
    }
}