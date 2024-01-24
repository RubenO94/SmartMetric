import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    try {
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)
        const submissionId = pathSegments[pathSegments.length - 1]

        const [questionsResponse] = await Promise.all([
            api("GET", `Submissions/${submissionId}`)
        ])
        const review = questionsResponse?.body
        return { review }
    } catch(error) {
        throw error
    }
}