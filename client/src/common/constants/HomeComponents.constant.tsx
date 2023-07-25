import AudioPlayer from "../../components/AudioPlayer";

export const PC_MOBILE_ORDER: HomeComponentOptions[] = ["HomeAudio", "HomeGif", "HomeFamily", "HomeText"];
export const TABLET_ORDER: HomeComponentOptions[] = ["HomeGif", "HomeFamily", "HomeAudio", "HomeText"];
export const COMPONENT_MAPPER: Record<HomeComponentOptions, React.ReactNode> = {
   HomeAudio: (
      <AudioPlayer
         className="home_audio_player home_child"
         src="/sounds/open-the-gate.mp3"
         title="פתחו את השער"
         subtitle="מקהלת אלי שיר"
      />
   ),
   HomeFamily: (
      <img
         className="home_family_img home_child home_img"
         src="/images/family-song.webp"
         alt="תמונת המשפחה"
      />
   ),
   HomeGif: (
      <img
         className="home_gif home_child home_img"
         src="/images/home-page-gif.gif"
         alt="סבתא שושי בונה אתר"
      />
   ),
   HomeText: (
      <p className="home_text home_child">
         האתר המשפחתי מתוחזק ע"י סבתא שושי ללמוד וללמד את תולדות המשפחה ולשתף את כל בני המשפחה בשמחות בחוויות ובארועים
      </p>
   ),
};

export type HomeComponentOptions = "HomeAudio" | "HomeGif" | "HomeFamily" | "HomeText";
