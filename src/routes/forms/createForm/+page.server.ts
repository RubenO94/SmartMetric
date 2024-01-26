import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms");
        const permission = window.permissions.find((p: any) => p.permissionType === "Create");
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
    } catch (error) {
        throw error
    }
}