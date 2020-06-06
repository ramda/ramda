export default function _promap(f, g, profunctor) {
  return function(x) {
    return g(profunctor(f(x)));
  };
}
