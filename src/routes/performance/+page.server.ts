import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { api } from "$lib/api/_api";

export const load: PageServerLoad = async ({ parent }) => {
    const {user} = await parent()
    if (user?.profileType === 'Backoffice') throw redirect(302, "/")
    try {
        const [reviewsResponse] = await Promise.all([
            api("GET", `Reviews/ReviewsCompleted`)
        ])
        
        let reviews = reviewsResponse?.body
        let [submissionResponse]: any = []
        let submissions: any[] = []

        for (const [index, review] of reviews.entries()) {
            [submissionResponse] = await Promise.all([
                api("GET", `Reviews/Submissions?reviewId=${review.reviewId}`)
            ])
            submissions = [...submissions, submissionResponse.body]
        }

        return { reviews, submissions }
    } catch(error) {
        throw error
    }
}