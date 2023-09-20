export type IfEquals<V1, V2, Equal = unknown, NotEqual = never> = (<G>() => G extends V1 ? 1 : 2) extends <
   G,
>() => G extends V2 ? 1 : 2
   ? Equal
   : NotEqual;
