export function countLoop<T = void>(count: number, func: (index: number) => T) {
   const arr: T[] = [];
   for (let i = 0; i < count; i++) {
      arr.push(func(i));
   }
   return arr;
}
