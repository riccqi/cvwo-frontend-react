
export interface Todo {
    id: string
    text: string
    completed: boolean
    expired: boolean
    trashed: boolean

    urgency?: number
    category?: string
    time?: number
}