'use server'

import { serverMutation } from "../core/server"

export const createSubcription = async (subsInfo) =>{
    return serverMutation('/api/subscriptions', subsInfo)
}