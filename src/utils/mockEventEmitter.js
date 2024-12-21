import { EventEmitter } from "events";

if (typeof window !== "undefined") {
  window.EventEmitter = EventEmitter;
}
