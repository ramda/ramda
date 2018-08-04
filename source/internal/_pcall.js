export default function _pcall(fn, ...args) {
  try {
    return { ok: true, value: fn.apply(this, args) };
  } catch (error) {
    return { ok: false, error };
  }
}
