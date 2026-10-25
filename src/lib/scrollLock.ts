let count = 0;
let original = '';

/** Ref-counted body scroll lock; the last release restores the original overflow. */
export function lockScroll(): () => void {
  if (count++ === 0) {
    original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--count === 0) document.body.style.overflow = original;
  };
}
