var __;  // This is intentionally left `undefined`.
try {
    Object.defineProperty(R, '__', {writable: false, value: __});
} catch (e) {
    R.__ = __;
}
