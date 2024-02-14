import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    if (user?.profileType === 'Backoffice') throw redirect(302, "/")
    try {
        const [employeesResponse] = await Promise.all([
            api("GET", `Employee?chefiaId=${user?.employeeId}`)
        ])
        let employees = employeesResponse?.body

        const [reviewsResponse] = await Promise.all([
            api("GET", "Reviews/ReviewsCompleted")
        ])
        let reviews = reviewsResponse?.body
        let [submissionResponse]: any = []
        let submissions: any[] = []

        for (const review of reviews) {
            [submissionResponse] = await Promise.all([
                api("GET", `Reviews/Submissions?reviewId=${review.reviewId}`)
            ])
            submissions = [...submissions, submissionResponse.body]
        }

        return { reviews, employees, submissions }
    } catch (error) {
        throw error
    }
}