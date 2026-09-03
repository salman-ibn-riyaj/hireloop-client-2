import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    "seeker_pro": 'price_1UBTLdPwSCNHe8AwEEwbUJYG',
    "seeker_premium": 'price_1UBhZcPwSCNHe8Aw8kIHR3QQ',
    "recruiter_growth": 'price_1UBhboPwSCNHe8AwIYjvceqE',
    "recruiter_enterprise": 'price_1UBhcYPwSCNHe8AwFPgzUGwn'
}