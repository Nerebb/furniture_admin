import { Status } from "@prisma/client";

/**
 * 
 * @param status Order Status
 * @returns true: can be disable, false: cannot
 */
export function checkOrderStatus(status: Status) {
    if (status === Status.completed
        || status === Status.shipping
        || status === Status.orderCanceled
    ) return true
    return false
}