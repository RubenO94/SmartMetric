import { api } from "$lib/api/_api"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
    try {
        //Using the URL constructor to parse the URL
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)

        // Get last element of url, Id of the formTemplate
        const reviewId = pathSegments[pathSegments.length - 1]

        const [reviewResponse] = await Promise.all([
            api ("GET", `Reviews/${reviewId}`)
        ])

        let review = reviewResponse?.body
        return { review }

    } catch (ex) {
        throw ex
    }
}