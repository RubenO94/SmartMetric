import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Backoffice") throw redirect(302, "/")
    try {
        const [submissionResponse] = await Promise.all([
            api ("GET", `Submissions/Employees/${user?.employeeId}`)
        ])
        let submissions = submissionResponse?.body

        const [reviewsResponse] = await Promise.all([
            api ("GET", `Reviews`)
        ])
        let reviews = reviewsResponse?.body

        return { submissions, reviews }
    } catch (error) {
        throw error
    }
}