import { AtLeastOneFunctionsFlow } from './util/tools';

export function pipeWith<TArgs extends any[], TResult>(
    transformer: (fn: (...args: any[]) => any, intermediatResult: any) => any,
    fns: AtLeastOneFunctionsFlow<TArgs, TResult>,
): (...args: TArgs) => TResult;
export function pipeWith(
    transformer: (fn: (...args: any[]) => any, intermediatResult: any) => any,
): <TArgs extends any[], TResult>(fns: AtLeastOneFunctionsFlow<TArgs, TResult>) => (...args: TArgs) => TResult;