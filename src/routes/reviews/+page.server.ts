import { api } from "$lib/api/_api";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const {user, lang: languages} = await parent()
    if (user?.profileType === 'Frontoffice') throw redirect(302, "/")
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Reviews");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) throw redirect(302, "/")
        
        const lang = languages[0].slice(0, 2)
        const [reviewsResponse] = await Promise.all([
            api ("GET", `Reviews?page=1&pageSize=20`)
        ])
        let reviews = reviewsResponse?.body
        return { reviews }
    } catch (ex) {
        throw ex
    }
}