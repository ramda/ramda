import * as R from 'ramda';

let letters = (idx) => (n) => R.range(idx, idx + R.clamp(0, 26, n)).map(i => String.fromCharCode(i));
let upper = letters(65);
let lower = letters(97);
let nm = (cnt, fn) => R.range(0,cnt-1).map(fn).join(', ');

function sanctPipeDef(i, j) {
    let [lows, ups] = [lower, upper].map(f => f(i));
    let zipped = R.zip(lows, ups);
    let pars = nm(j, n => `a${n}: A${n}`);
    let types = nm(j, n => `A${n}`);
    return `export function pipe<${types}${i>1?', ':''}${ups.splice(1).join(', ')}, Z>(functions: [(${pars})=>${zipped.splice(1).map(([low, up]) => `${up}, (${low}: ${up})=>`).join('')}Z]): CurriedFn${j}<${types}, Z>;`
}
R.flatten(R.range(1,10).map(i => R.range(1,5).map(j => sanctPipeDef(i,j)))).join('\r\n')

function composeDef(i, j) {
    let vals = nm(j, n => `V${n}`);
    let pars = nm(j, n => `x${n}: V${n}`);
    let fns = nm(i-1, n => `fn${i-1-n}: (x: T${i-1-n}) => T${i-n}`);
    let types = nm(i, n => `T${n+1}`);
    return `compose<${vals}, ${types}>(${fns}${i>1?', ':''}fn0: (${pars}) => T1): CurriedFn${j}<${vals}, T${i}>;`
}
R.flatten(R.range(1,10).map(i => R.range(1,5).map(j => composeDef(i,j)))).join('\r\n')

function composePDef(i, j) {
    let vals = nm(j, n => `V${n}`);
    let pars = nm(j, n => `x${n}: V${n}`);
    let fns = nm(i-1, n => `fn${i-1-n}: (x: T${i-1-n}) => Promise<T${i-n}>|T${i-n}`);
    let types = nm(i, n => `T${n+1}`);
    return `composeP<${vals}, ${types}>(${fns}${i>1?', ':''}fn0: (${pars}) => Promise<T1>): CurriedFn${j}<${vals}, Promise<T${i}>>;`
}
R.flatten(R.range(1,10).map(i => R.range(1,5).map(j => composePDef(i,j)))).join('\r\n')

function pipeDef(i, j) {
    let vals = nm(j, n => `V${n}`);
    let pars = nm(j, n => `x${n}: V${n}`);
    let fns = nm(i-1, n => `fn${n+1}: (x: T${n+1}) => T${n+2}`);
    let types = nm(i, n => `T${n+1}`);
    return `pipe<${vals}, ${types}>(fn0: (${pars}) => T1${i>1?', ':''}${fns}): CurriedFn${j}<${vals}, T${i}>;`
}
R.flatten(R.range(1,10).map(i => R.range(1,5).map(j => pipeDef(i,j)))).join('\r\n')

function pipePDef(i, j) {
    let vals = nm(j, n => `V${n}`);
    let pars = nm(j, n => `x${n}: V${n}`);
    let fns = nm(i-1, n => `fn${n+1}: (x: T${n+1}) => Promise<T${n+2}>|T${n+2}`);
    let types = nm(i, n => `T${n+1}`);
    return `pipeP<${vals}, ${types}>(fn0: (${pars}) => Promise<T1>${i>1?', ':''}${fns}): CurriedFn${j}<${vals}, Promise<T${i}>>;`
}
R.flatten(R.range(1,10).map(i => R.range(1,5).map(j => pipePDef(i,j)))).join('\r\n')

function pipeKDef(i) {
    let fns = nm(i-1, n => `fn${n+1}: (x: T${n+1}) => Chain<T${n+2}>`);
    let types = nm(i, n => `T${n+1}`);
    return `pipeK<V, ${types}>(fn0: (v: Chain<V>) => Chain<T1>${i>1?', ':''}${fns}): (v: Chain<V>) => Chain<T${i}>;`
}
R.flatten(R.range(1,10).map(i => pipeKDef(i))).join('\r\n')

function composeKDef(i) {
    let fns = nm(i-1, n => `fn${i-1-n}: (x: T${i-1-n}) => Chain<T${i-n}>`);
    let types = nm(i, n => `T${n+1}`);
    return `composeK<V, ${types}>(${fns}${i>1?', ':''}fn0: (v: Chain<V>) => Chain<T1>): (v: Chain<V>) => Chain<T${i}>;`
}
R.flatten(R.range(1,10).map(i => composeKDef(i))).join('\r\n')

function curryDef(i) {
    let lows = lower(i);
    let pars = nm(i, n => `${lows[n]}: T${n+1}`);
    let types = nm(i, n => `T${n+1}`);
    return `curry<${types}, TResult>(fn: (${pars}) => TResult): CurriedFn${i}<${types}, TResult>;`
}
R.flatten(R.range(2,10).map(i => curryDef(i))).join('\r\n')

function CurriedFnDef(i) {
    let types = nm(i, n => `T${n+1}`);
    let curriedDef = (j) => {
        let pars = nm(j, n => `t${n+1}: T${n+1}`);
        let tps = nm(i-j, n => `T${j+n+1}`);
        let curried = (i-j > 1) ? `CurriedFn${i-j}<${tps}, R>` : (i-j == 0) ? 'R' : `(t${i}: T${i}) => R`;
        return `(${pars}): ${curried};`
    }
    let defs = R.range(0,i).map(n => curriedDef(n+1)).join('\r\n    ');
    return `interface CurriedFn${i}<${types}, R> {
    ${defs}
}`;
}
R.flatten(R.range(2,10).map(i => CurriedFnDef(i))).join('\r\n')


