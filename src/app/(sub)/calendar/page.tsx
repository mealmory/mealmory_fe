import DatePicker from "@/app/(sub)/calendar/DatePicker";
import LikeModalView from "../LikeModalView";

export default function DatePickPage() {
  return (
    <LikeModalView maxContent maxWidth>
      <DatePicker />
    </LikeModalView>
  );
}
