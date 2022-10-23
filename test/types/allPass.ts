import { expectType, expectError } from 'tsd';
import * as R from '../../es/index';

const isOld = R.propEq('age', 212);
const isAllergicToGarlic = R.propEq('garlic_allergy', true);
const isAllergicToSun = R.propEq('sun_allergy', true);
const isFast = R.propEq('fast', null);
const isAfraid = R.propEq('fear', undefined);

const isVampire = R.allPass([
  isOld,
  isAllergicToGarlic,
  isAllergicToSun,
  isFast,
  isAfraid
]);

expectType<boolean>(
  isVampire({
    age: 212,
    garlic_allergy: true,
    sun_allergy: true,
    fast: null,
    fear: undefined
  })
);

expectType<boolean>(
  isVampire({
    age: 21,
    garlic_allergy: true,
    sun_allergy: true,
    fast: false,
    fear: true
  })
);

expectError(
  isVampire({
    age: 40,
    garlic_allergy: true,
    fear: false
  })
);

expectError(
  isVampire({
    nickname: 'Blade'
  })
);
