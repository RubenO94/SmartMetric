import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    try {
        const [reviewsResponse] = await Promise.all([
            api("GET", `Reviews`)
        ])
        const reviews = reviewsResponse?.body
        return { reviews }
    } catch (error) {
        throw error
    }
}