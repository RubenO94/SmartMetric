import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Reviews")
        const permission = window.permissions.find((p: any) => p.permissionType === "Update")
        if (!permission.hasPermission) throw redirect(302, "/")

        //Using the URL constructor to parse the URL
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)
        const reviewId = pathSegments[pathSegments.length - 2]

        const [departmentsResponse] = await Promise.all([api("GET",  "Departments")])
        const [reviewResponse] = await Promise.all([api("GET", `Reviews/${reviewId}`)])

        let departments = departmentsResponse?.body
        let review = reviewResponse?.body
        return { departments, review }
    } catch (error) {
        throw error
    }

}