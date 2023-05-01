import { format } from 'date-fns'

export default function dateFormat(value?: Date | string | number, formatType?: string): string {
    if (!value) return ""
    const date = new Date(value)
    const formatedDate = format(date, formatType ? formatType : "dd-MM-yyyy")
    return formatedDate
}
