/**
 * Legacy alias — prefer /api/rpc?network=…
 * Keeps old /api/wire?cluster=… clients working during migration.
 */
export { default, config } from './rpc';
