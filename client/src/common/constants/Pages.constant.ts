import { Page } from "../types";

export const PAGES = {
   home: "בית",
   stories: "סבתא שושי מספרת",
   congrats: "ברכות ואיחולים",
   occasions: "אירועיים משפחתיים",
   pictures: "תמונות משפחתיות",
   origin: "תולדות המשפחה",
};

export const PAGES_ORDER: Page[] = Object.keys(PAGES) as Page[];
