import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { api } from "$lib/api/_api";

export const load: PageServerLoad = async ( event ) => {
    try {
        const window = event.locals.user?.authorizations.find((n: any) => n.windowType === "AdminSettings")
        const permission = window.permissions.find((p: any) => p.permissionType === "Read")
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
        const [request] = await Promise.all([
            api("GET", `Profiles`)
        ])
        let profiles = request?.body || []
        return { profiles }
    } catch (error) {
        throw error
    }
}