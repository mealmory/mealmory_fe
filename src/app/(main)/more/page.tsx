import ThemeController from "./ThemeController";
import NotificationList from "./NotificationList";
import ServiceInfoList from "./ServiceInfoList";
import UserMenu from "./UserMenu";

export default function More() {
  return (
    <div className="w-full h-full p-5 sm:py-6 sm:px-9">
      <ThemeController />
      <NotificationList />
      <ServiceInfoList />
      <UserMenu />
    </div>
  );
}
