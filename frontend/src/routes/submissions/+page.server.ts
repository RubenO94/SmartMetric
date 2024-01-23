import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user?.profileType != 'Frontoffice') throw redirect(302, "/")
    try {
        const [submissionResponse] = await Promise.all([
            api ("GET", `Submissions/Employees/${locals.user?.employeeId}`)
        ])
        console.log(submissionResponse)
        let submissions = submissionResponse?.body
        return { submissions }
    } catch (error) {
        throw error
    }
}