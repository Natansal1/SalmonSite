export function parseQueryObject(queryObj: { [key: string]: string }) {
   const values: string[] = [];
   for (let key in queryObj) {
      values.push(`${key}=${queryObj[key]}`);
   }

   return values.join("&");
}

export type ParseUrlType = {
   base: string;
   pathname?: string;
   query?: { [key: string]: string };
};

export function parseUrl(obj: ParseUrlType) {
   const { base, pathname = "", query = {} } = obj;
   return `${base}/${pathname}?${parseQueryObject(query)}`;
}
