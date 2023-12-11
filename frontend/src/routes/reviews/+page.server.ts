import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    try {
        const [reviewsResponse] = await Promise.all([
            api ("GET", `Reviews?page=1&pageSize=20`)
        ])

        let reviews = reviewsResponse?.body
        return { reviews }

    } catch (ex) {
        throw ex
    }
}