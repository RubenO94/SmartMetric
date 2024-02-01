import { api } from "$lib/api/_api";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent()
    if (user?.profileType === "Frontoffice") throw redirect(302, "/")
    try {
        const window = user?.authorizations.find((n: any) => n.windowType === "Reviews");
        const permission = window.permissions.find((p: any) => p.permissionType === "Create");
        if (!permission.hasPermission) throw redirect(302, "/")
    } catch (error) {
        throw error
    }
}