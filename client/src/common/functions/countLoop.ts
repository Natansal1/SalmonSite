export function countLoop<C extends number, T = void>(count: C, func: (index: number) => T) {
   const arr: T[] = [];
   for (let i = 0; i < count; i++) {
      arr.push(func(i));
   }

   return arr as ArrayWithLength<C, T>;
}

type ArrayWithLength<Len extends number, T extends unknown, Occ extends T[] = []> = Occ["length"] extends Len
   ? Occ
   : ArrayWithLength<Len, T, [T, ...Occ]>;
