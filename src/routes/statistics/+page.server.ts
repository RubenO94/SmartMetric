import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, url }) => {
    try {
        const window = locals.user?.authorizations.find((n: any) => n.windowType === "Statistics");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
    } catch (error) {
        throw error
    }
}