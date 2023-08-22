import React from "react";
import { toHebrewJewishDate, toJewishDate } from "jewish-date";
import FullCalendar from "@fullcalendar/react";
import { DayCellContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { VerboseFormattingArg } from "@fullcalendar/core/internal.js";
import HebrewLocal from "@fullcalendar/core/locales/he";

import "../../styles/components/hebrew-calendar.scss";
import { parseUrl } from "../../common/functions";
import PageWrapper from "../PageWrapper/PageWrapper";

const DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
//prettier-ignore
const MONTH = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

interface HebrewCalenderProps {}

const HebrewCalender: React.FC<HebrewCalenderProps> = () => {
   function getContentFromDate(date: DayCellContentArg) {
      const gDay = date.dayNumberText;
      const { day, monthName } = toHebrewJewishDate(toJewishDate(date.date));
      return (
         <div className="day_dates_container">
            <span>
               {day} {monthName}
            </span>
            <span>{gDay}</span>
         </div>
      );
   }

   function getMonthFromDate(date: VerboseFormattingArg) {
      console.log(date);
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
      <PageWrapper
         className="page hebrew_calendar"
         style={{ overflow: "scroll" }}
      >
         <FullCalendar
            headerToolbar={{
               center: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            direction="rtl"
            dayHeaderContent={(day) => DAYS[day.dow]}
            dayCellContent={getContentFromDate}
            titleFormat={getMonthFromDate}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={HebrewLocal}
            eventClick={(_e) => {
               // e.jsEvent.preventDefault();
               // e.event.url && window.open(e.event.url);
               // console.log(e.event);
            }}
            events={[
               {
                  title: "hello",
                  // start: new Date(),
                  start: Date.now(),
                  end: Date.now() + 1000 * 60 * 60 * 48,
               },
            ]}
            eventSources={[
               {
                  url: parseUrl({
                     base: "https://www.hebcal.com",
                     pathname: "hebcal",
                     query: {
                        cfg: "fc", // Type of response @fullcalendar
                        v: "1", // Version
                        lg: "he", // Language
                        i: "on", // Israel holidays
                        maj: "on", // Major holidays
                        min: "on", // Minor holidays (Tu BiShvat, Lag B’Omer, …)
                        nx: "on", // Rosh Chodesh
                        mf: "on", // Minor fasts (Ta’anit Esther, Tzom Gedaliah, …)
                        ss: "on", // Special Shabbatot (Shabbat Shekalim, Zachor, …)
                        mod: "on", // Modern holidays (Yom HaShoah, Yom HaAtzma’ut, …)
                        s: "on", // Parashat ha-Shavuah on Saturday
                        geo: "geoname", // Location type
                        geonameid: "293918", //Location ID (Petah Tiqwa)
                     },
                  }),
                  eventDataTransform: (e) => (delete e.url, e),
               },
            ]}
         />
      </PageWrapper>
   );
};

export default HebrewCalender;
