import { api } from "$lib/api/_api"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, url, parent }) => {
    const { user, lang: languages } = await parent()
    const pageNumber = Number(url.searchParams.get('page')) || 1
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
        const lang = languages[0].slice(0, 2)
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