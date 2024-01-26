import { api } from "$lib/api/_api"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        //Check permission of backoffice
        const window = user?.authorizations.find((n: any) => n.windowType === "Reviews")
        const permission = window.permissions.find((p: any) => p.permissionType === "Update")
        if (!permission.hasPermission) throw redirect(302, "/")

        const parsedUrl = new URL(url)
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
        const reviewId = pathSegments[pathSegments.length - 2]
        const [reviewResponse] = await Promise.all([
            api("GET", `Reviews/${reviewId}`)
        ])

        const [departmentsResponse] = await Promise.all([
            api("GET", `Departments`)
        ])

        let review = reviewResponse?.body
        let departments = departmentsResponse?.body
        return {review, departments}
    } catch (ex) {
        throw ex
    }
}