export class MySwitch<ValueType, ReturnType> {
   value: ValueType;
   result?: ReturnType = undefined;

   constructor(value: ValueType) {
      this.value = value;
      return this;
   }

   case(val: ValueType, res: ReturnType) {
      if (this.value === val) this.result = res;
      return this;
   }

   default(res: ReturnType) {
      if (this.result === undefined) this.result = res;
      return this.result;
   }

   done() {
      return this.result;
   }
}
