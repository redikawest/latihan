import { UNKNOWN } from "./errorConstant"

export const PENDING_ID = 99
export const ACTIVE_ID = 1
export const INACTIVE_ID = 2
export const BANNED_ID = 4

const PENDING = "pending"
const ACTIVE = "active"
const INACTIVE = "inactive"
const BANNED = 'banned'

export const getStatus = (id) => {
    switch (id) {
        case ACTIVE_ID:
            return {
                id: id,
                name: ACTIVE
            }
    
        case INACTIVE_ID:
            return {
                id: id,
                name: INACTIVE
            }

        case PENDING_ID:
            return {
                id: id,
                name: PENDING
            }

        case BANNED_ID:
            return {
                id: id,
                name: BANNED
            }
        
        default: UNKNOWN
    }
}