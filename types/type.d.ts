export type TypeFunctionReturnTypes =
  | "Object"
  | "Number"
  | "Boolean"
  | "String"
  | "Null"
  | "Array"
  | "RegExp"
  | "Function"
  | "Undefined"
  | "Symbol"
  | "Error"
  | "Date";
export function type(val: any): TypeFunctionReturnTypes;
