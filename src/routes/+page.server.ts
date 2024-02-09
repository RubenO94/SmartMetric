import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, parent }) => {
    await parent()
    try {
        const [reviews] = await Promise.all([api("GET", `Reviews`)])

        if (locals.user?.profileType === 'Frontoffice') {
            const [submissions] = await Promise.all([api("GET", `Submissions/EvaluatedEmployee/${locals.user?.employeeId}`)]) 
            return { submissions: submissions?.body, reviews: reviews?.body }
        }

        return { reviews: reviews?.body }
    } catch (error) {
        throw error
    }
}