import { api } from "$lib/api/_api"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user, lang: languages } = await parent()
    const pageNumber = Number(url.searchParams.get('page')) || 1
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        //Check permission of backoffice
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) throw redirect(302, "/")

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