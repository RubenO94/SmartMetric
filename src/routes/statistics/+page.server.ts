import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        const window =user?.authorizations.find((n: any) => n.windowType === "Statistics");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) throw redirect(302, "/")
    } catch (error) {
        throw error
    }
}