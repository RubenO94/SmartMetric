import { api } from "$lib/api/_api"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
    try {
        const parsedUrl = new URL(url)
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
        const reviewId = pathSegments[pathSegments.length - 2]
        const [reviewResponse] = await Promise.all([
            api("GET", `Reviews/${reviewId}`)
        ])

        const [departmentsResponse] = await Promise.all([
            api("GET", `Departments`)
        ])

        let review = reviewResponse?.body
        let departments = departmentsResponse?.body
        return {review, departments}
    } catch (ex) {
        throw ex
    }
}