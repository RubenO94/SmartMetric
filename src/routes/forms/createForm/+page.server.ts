import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Unauthorized") throw redirect(302, "/")
    try {
        //Check permission of backoffice
        const window = user?.authorizations.find((n: any) => n.windowType === "Forms");
        const permission = window.permissions.find((p: any) => p.permissionType === "Create");
        if (!permission.hasPermission) throw error(302, "/")

    } catch (error) {
        throw error
    }
}