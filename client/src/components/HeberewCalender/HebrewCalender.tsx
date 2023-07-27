import React from "react";
import { toHebrewJewishDate, toJewishDate } from "jewish-date";
import FullCalendar from "@fullcalendar/react";
import { DayCellContentArg, DayHeaderContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { VerboseFormattingArg } from "@fullcalendar/core/internal.js";
import HebrewLocal from "@fullcalendar/core/locales/he";

const DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
//prettier-ignore
const MONTH = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

interface HebrewCalenderProps {}

const HebrewCalender: React.FC<HebrewCalenderProps> = () => {
   function getContentFromDate(date: DayCellContentArg) {
      const gDay = date.dayNumberText;
      const { day, monthName } = toHebrewJewishDate(toJewishDate(date.date));
      return (
         <div>
            <span>
               {day} {monthName}
            </span>
            <span>{gDay}</span>
         </div>
      );
   }

   function getMonthFromDate(date: VerboseFormattingArg) {
      const startHebMonth = toHebrewJewishDate(toJewishDate(date.start.marker)).monthName;
      const endHebMonth = date.end && toHebrewJewishDate(toJewishDate(date.end.marker)).monthName;
      const doneHebMonth = endHebMonth
         ? startHebMonth === endHebMonth
            ? startHebMonth
            : `${startHebMonth} - ${endHebMonth}`
         : startHebMonth;

      const hebYear = toHebrewJewishDate(toJewishDate(date.start.marker)).year;

      const gYear = date.start.year;
      const gMonth = MONTH[date.start.month];
      return `${doneHebMonth} ${hebYear} | ${gMonth} ${gYear}`;
   }

   return (
      <div
         className="page"
         style={{ overflow: "scroll" }}
      >
         <FullCalendar
            direction="rtl"
            dayHeaderContent={(day) => DAYS[day.dow]}
            dayCellContent={getContentFromDate}
            timeZone="Israel/Jerusalem"
            titleFormat={getMonthFromDate}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={HebrewLocal}
         />
      </div>
   );
};

export default HebrewCalender;
