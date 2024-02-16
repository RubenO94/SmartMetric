import { api } from "$lib/api/_api"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user } = await parent()
    if (user?.profileType === 'Frontoffice') throw redirect(302, "/")
    try {
        //Check Permission backoffice
        const window = user?.authorizations.find((n: any) => n.windowType === "Reviews")
        const permission = window.permissions.find((p: any) => p.permissionType === "Read")
        if (!permission.hasPermission) throw redirect(302, "/")

        //Using the URL constructor to parse the URL
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)
        const reviewId = pathSegments[pathSegments.length - 1]

        const [reviewResponse] = await Promise.all([
            api ("GET", `Reviews/${reviewId}`)
        ])

        let review = reviewResponse?.body
        return { review }
    } catch (ex) {
        throw ex
    }
}