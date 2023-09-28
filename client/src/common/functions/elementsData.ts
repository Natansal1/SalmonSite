export function getInnerHeight(elm: Element) {
   const computed = getComputedStyle(elm);
   const padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
   const margin = parseFloat(computed.marginTop) + parseFloat(computed.marginBottom);

   return elm.clientHeight - padding - margin;
}

export function getInnerWidth(elm: Element) {
   const computed = getComputedStyle(elm);
   const padding = parseFloat(computed.paddingRight) + parseFloat(computed.paddingLeft);
   const margin = parseFloat(computed.marginRight) + parseFloat(computed.marginLeft);

   return elm.clientWidth - padding - margin;
}

export function getInnerSize(elm: Element) {
   return {
      width: getInnerWidth(elm),
      height: getInnerHeight(elm),
   };
}
``