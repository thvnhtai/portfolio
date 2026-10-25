export function shouldPlayPreloader(storage: Pick<Storage, 'getItem'> | null, reducedMotion: boolean): boolean {
  if (reducedMotion) return false;
  try { return storage?.getItem('preloaded') !== '1'; } catch { return true; }
}
export function markPreloaded(storage: Pick<Storage, 'setItem'> | null) {
  try { storage?.setItem('preloaded', '1'); } catch { /* storage blocked: preloader may replay */ }
}
