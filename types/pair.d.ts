export function pair<F, S>(fst: F, snd: S): [F, S];
export function pair<F>(fst: F): <S>(snd: S) => [F, S];
