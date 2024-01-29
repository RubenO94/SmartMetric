import { api } from "$lib/api/_api";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

let submissionId: string = ''

export const load: PageServerLoad = async ({ url, parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Backoffice") throw redirect(302, "/")
    try {
        const parsedURL = new URL(url)
        const pathSegments = parsedURL.pathname.split("/").filter(Boolean)
        submissionId = pathSegments[pathSegments.length - 1]

        const [submissionResponse] = await Promise.all([
            api("GET", `Submissions/${submissionId}`)
        ])
        const submission = submissionResponse?.body

        const [questionsResponse] = await Promise.all([
            api("GET", `Questions?reviewId=${submission.reviewId}`)
        ])
        const questions = questionsResponse?.body
        return { submission, questions }
    } catch(error) {
        throw error
    }
}

export const actions = {
    default: async ({ request, params, url }: any) => {
        const formData = await request.formData()
        let answers: any = []
        for (const data of formData) {
            if (!isNaN(parseInt(data[1]))) {
                answers.push({
                    QuestionId: data[0].toString(),
                    TextResponse: null,
                    RatingValueResponse: parseInt(data[1])
                })
            } else {
                answers.push({
                    QuestionId: data[0].toString(),
                    TextResponse: data[1].toString(),
                    RatingValueResponse: null
                })
            }
        }
        const response = await api("PATCH", `Submissions/${submissionId}`, { reviewResponses: answers })
        if (!response?.status) throw error(401, response?.error)
        throw redirect (302, "/submissions")
    }
}