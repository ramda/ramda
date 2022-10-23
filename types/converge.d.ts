import * as _ from 'ts-toolbelt';
import { Fn, IfFunctionsArgumentsDoNotOverlap, ReturnTypesOfFns, LargestArgumentsList } from './util/tools';

export function converge<
  TResult,
  FunctionsList extends ReadonlyArray<Fn> &
  IfFunctionsArgumentsDoNotOverlap<_Fns, 'Functions arguments types must overlap'>,
  _Fns extends ReadonlyArray<Fn> = FunctionsList
>(
  converging: (...args: ReturnTypesOfFns<FunctionsList>) => TResult,
  branches: FunctionsList,
): _.F.Curry<(...args: LargestArgumentsList<FunctionsList>) => TResult>;
export function converge<
  CArgs extends ReadonlyArray<any>,
  TResult,
  FunctionsList extends readonly [
    ...{
      [Index in keyof CArgs]: (...args: ReadonlyArray<any>) => CArgs[Index];
    }
  ] &
  IfFunctionsArgumentsDoNotOverlap<_Fns, 'Functions arguments types must overlap'>,
  _Fns extends ReadonlyArray<Fn> = FunctionsList
>(
  converging: (...args: CArgs) => TResult,
  branches: FunctionsList,
): _.F.Curry<(...args: LargestArgumentsList<FunctionsList>) => TResult>;
