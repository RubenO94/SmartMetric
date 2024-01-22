import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    console.log(locals.user)
    try {
        const [submissionResponse] = await Promise.all([
            api ("GET", `Submissions/${locals.user?.employeeId}`)
        ])
        console.log(submissionResponse)
        let submissions = submissionResponse?.body
        return { submissions }
    } catch (error) {
        throw error
    }
}