

export interface Message {
    ack: boolean,
    idempotent: string,
    cmd: number,
    payload: Record<string, any>
}

declare global {
    interface Window {
        desk: string
    }
}