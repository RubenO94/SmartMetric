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

        let reviews: any = []
        let total = 0
        let currentPage = 1

        do {
            const [reviewsResponse] = await Promise.all([
                api("GET", `Reviews?page=${currentPage}&pageSize=20`)
            ])

            if (reviewsResponse) {
                const currentReviews = reviewsResponse.body
                total = reviewsResponse.total

                reviews = reviews.concat(currentReviews)
                currentPage++
            } else {    
                console.error("Failed to fetch reviews")
                break
            }
        } while (total > reviews.length)

        return { reviews }
    } catch (ex) {
        throw ex
    }
}