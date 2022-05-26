import { Path } from './util/tools';

export function paths<T>(paths: Path[], obj: any): Array<T | undefined>;
export function paths<T>(paths: Path[]): (obj: any) => Array<T | undefined>;