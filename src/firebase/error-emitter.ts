'use client';

type ErrorHandler = (error: any) => void;

class ErrorEmitter {
  private handlers: { [channel: string]: ErrorHandler[] } = {};

  on(channel: string, handler: ErrorHandler) {
    if (!this.handlers[channel]) {
      this.handlers[channel] = [];
    }
    this.handlers[channel].push(handler);
  }

  emit(channel: string, error: any) {
    if (this.handlers[channel]) {
      this.handlers[channel].forEach((handler) => handler(error));
    }
  }

  off(channel: string, handler: ErrorHandler) {
    if (this.handlers[channel]) {
      this.handlers[channel] = this.handlers[channel].filter((h) => h !== handler);
    }
  }
}

export const errorEmitter = new ErrorEmitter();
