import { api } from "$lib/api/_api"
import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user, lang: languages } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        //Check permission of backoffice
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) throw redirect(302, "/")

        const lang = languages[0].slice(0, 2)

        let formTemplates: any = []
        let total = 0
        let currentPage = 1

        do {
            const [formTemplatesResponse] = await Promise.all([
                api("GET", `FormTemplates?page=${currentPage}&pageSize=20`)
            ])

            if (formTemplatesResponse) {
                const currentFormTemplates = formTemplatesResponse.body
                total = formTemplatesResponse.total

                formTemplates = formTemplates.concat(currentFormTemplates)
                currentPage++
            } else {
                console.log("Failed to fetch form templates")
                break
            }
        } while (total > formTemplates.length)

        return { formTemplates }
    } catch (ex) {
        throw ex
    }
}