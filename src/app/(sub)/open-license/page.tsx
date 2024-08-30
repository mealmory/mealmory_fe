import OFL from "./license/OFL.md";
import MIT from "./license/MIT.md";
import LicenseListItem from "./LicenseListItem";

export default function OpenLicensePage() {
  return (
    <main className="w-full max-w-[900px] h-full mx-auto">
      <ul className="w-full h-full flex flex-col gap-3">
        <LicenseListItem name={"SIL open font license version 1.1"}>
          <OFL />
        </LicenseListItem>
        <LicenseListItem name={"MIT"}>
          <MIT />
        </LicenseListItem>
      </ul>
    </main>
  );
}
