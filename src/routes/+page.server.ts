import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, parent }) => {
    await parent()
    try {
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

        if (locals.user?.profileType === 'Frontoffice') {
            const [submissions] = await Promise.all([api("GET", `Submissions/EvaluatedEmployee/${locals.user?.employeeId}`)]) 
            return { submissions: submissions?.body, reviews }
        }

        return { reviews }
    } catch (error) {
        throw error
    }
}