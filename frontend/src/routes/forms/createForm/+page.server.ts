import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ( event ) => {
    try {
        if (!event.locals.user?.authorizations[0].permissions[0].hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
    } catch (error) {
        throw error
    }
}