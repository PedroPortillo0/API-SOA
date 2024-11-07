export interface EventConsumer {
    consume(queue: string, callback: (event: any) => Promise<void>): Promise<void>;
}
