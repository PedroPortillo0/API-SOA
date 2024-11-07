export interface EventPublisher {
    publishEvent(event: any): Promise<void>;
  }
  