import DatePicker from "@/app/(sub)/calendar/DatePicker";
import Modal from "@/app/@modal/Modal";

export default function MealPlanCalendar() {
  return (
    <Modal maxContent maxWidth>
      <DatePicker />
    </Modal>
  );
}
