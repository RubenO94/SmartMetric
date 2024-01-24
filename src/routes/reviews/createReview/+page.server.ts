import { api } from "$lib/api/_api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    try {
        const [responseDepartments] = await Promise.all([api("GET", `Departments`)])
        let departments = responseDepartments?.body
        return { departments }
    } catch (error) {
        throw error
    }
}