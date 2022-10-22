import { expectType } from "tsd";
import { __, aperture } from "../../es/index";

const arr = [1, 2, 3];

expectType<[] | [number][]>(aperture(1, arr));
expectType<[] | [number, number, number][]>(aperture(3, arr));
expectType<[] | [number, number, number, number, number][]>(aperture(5, arr));

expectType<[] | [number][]>(aperture(__, arr)(1));
expectType<[] | [number, number, number][]>(aperture(__, arr)(3));
expectType<[] | [number, number, number, number, number][]>(aperture(__, arr)(5));

expectType<[] | [number][]>(aperture(1)(arr));
expectType<[] | [number, number, number][]>(aperture(3)(arr));
expectType<[] | [number, number, number, number, number][]>(aperture(5)(arr));
