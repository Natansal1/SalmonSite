import { IfEquals } from "../types";

export class MySwitch<ValueType, ReturnType = unknown> {
   private value: ValueType;
   private result?: ReturnType = undefined;

   constructor(value: ValueType) {
      this.value = value;
      return this;
   }

   case<T extends ValueType, R extends ReturnType>(val: T, res: R | (() => R)) {
      if (this.value === val) this.result = res instanceof Function ? res() : res;
      return this as MySwitch<Exclude<ValueType, T>, IfEquals<ReturnType, unknown, R, ReturnType>>;
   }

   default(res: ReturnType | (() => ReturnType)) {
      if (this.result === undefined) this.result = res instanceof Function ? res() : res;
      return this.result;
   }

   done() {
      return this.result as (ValueType extends never ? ReturnType : ReturnType | undefined) extends never
         ? ReturnType
         : ReturnType | undefined;
   }
}

export function retSwitch<ValueType, ReturnType = unknown>(value: ValueType) {
   return new MySwitch<ValueType, ReturnType>(value);
}
