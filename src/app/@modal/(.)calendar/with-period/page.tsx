import DatePickerWithPeriod from "@/app/(sub)/calendar/DatePickerWithPeriod";
import Modal from "../../Modal";

export default function CalendarWithPeriod() {
  return (
    <Modal maxContent maxWidth>
      <DatePickerWithPeriod />
    </Modal>
  );
}
