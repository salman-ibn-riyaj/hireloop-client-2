import { serverFetch } from "../core/server"

export const getPlanByPlanId = async(planId) => {
    return serverFetch(`/api/plans?plan_id${planId}`)
}