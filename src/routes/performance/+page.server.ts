import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    // if (user?.profileType === 'Backoffice') throw redirect(302, "/")
    try {
        const [reviewsResponse] = await Promise.all([api("GET", "Reviews/ReviewsCompleted")])
        return { reviews: reviewsResponse?.body }
    } catch (error) {
        throw error
    }
}