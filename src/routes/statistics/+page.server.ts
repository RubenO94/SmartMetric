import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { api } from "$lib/api/_api"

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Statistics");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) throw redirect(302, "/")

        const [response] = await Promise.all([api("GET", "Reviews/ReviewsCompleted")])
        const reviews = response?.body
        return { reviews }
    } catch (error) {
        throw error
    }
}