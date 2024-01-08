import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    let activeSeparator = ''
    if (event.url.search === '') activeSeparator = 'Active'
    switch (event.url.searchParams.get('type')) {
        case 'ongoing':
            activeSeparator = 'Active'
            break
        case 'notStarted':
            activeSeparator = 'NotStarted'
            break
        case 'canceled':
            activeSeparator = 'Canceled'
            break
        case 'completed':
            activeSeparator = 'Completed'
            break
    }

    try {
        const window = event.locals.user?.authorizations.find((n: any) => n.windowType === "Reviews");
        const permission = window.permissions.find((p: any) => p.permissionType === "Read");
        if (!permission.hasPermission) {
            console.log("Unauthorized")
            throw redirect(302, "/")
        }
        const lang = event.locals.lang[0].slice(0, 2)
        const [reviewsResponse] = await Promise.all([
            api ("GET", `Reviews?page=1&pageSize=20&language=${lang}`)
        ])
        let reviews = reviewsResponse?.body
        return { reviews, activeSeparator }
    } catch (ex) {
        throw ex
    }
}