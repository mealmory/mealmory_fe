import ThemeController from "./ThemeController";
import NotificationList from "./NotificationList";
import ServiceInfoList from "./ServiceInfoList";

export default function More() {
  return (
    <div className="w-full h-full p-5 sm:py-6 sm:px-9">
      <ThemeController />
      <NotificationList />
      <ServiceInfoList />
    </div>
  );
}
