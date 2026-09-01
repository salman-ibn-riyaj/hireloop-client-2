'use server'

import { serverMutation } from "../core/server"

export const submitApplication = async(appliactionData) => {
    return serverMutation("/api/applications", appliactionData);

}