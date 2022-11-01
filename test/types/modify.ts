import { expectType, expectError } from "tsd";
import { modify, add } from "../../es/index";

type Person = { name: string; age: number; pets: string[] };
const person: Person = { name: "James", age: 20, pets: ["dog", "cat"] };

expectType<Person>(modify("age", add(1), person));
expectType<(...args: any) => any>(modify("age"));
expectType<(obj: object) => object>(modify("age", add(1)));
expectType<(obj: object) => object>(modify("age")(add(1)));
expectType<object>(modify("age")(add(1))(person));
expectType<object>(modify("age", add(1))(person));

expectError<(...args: any) => any>(modify(null));
expectError<(...args: any) => object>(modify(null, add(1)));
expectError<(...args: any) => object>(modify(null)(add(1)));
expectError<Person>(modify(null, add(1), person));
expectError<Person>(modify(1, add(1), undefined));
expectError<Person>(modify(1, add(1))(undefined));
