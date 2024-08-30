import { FONT_LICENSE, LIBRARYLIST } from "@/constants/service";

export default function OpenSourcePage() {
  return (
    <main className=" h-screen overflow-y-scroll scroll-visible p-2 mx-auto max-w-[600px]">
      <OpenList title="라이브러리">
        {LIBRARYLIST.map((item) => (
          <OpenSourceItem key={item.name} {...item} />
        ))}
      </OpenList>
      <OpenList title="폰트" className="mt-4">
        {FONT_LICENSE.map((font) => (
          <OpenFontItem key={font.name} {...font} />
        ))}
      </OpenList>
    </main>
  );
}

const OpenList = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) => {
  return (
    <div className={"w-full " + (className ?? "")}>
      <p className="text-xl">{title}</p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
};

interface OprnSouceItemProps {
  name: string;
  version: string;
  copyright: string;
  src: string;
  license: string;
}

const OpenSourceItem = ({
  name,
  version,
  copyright,
  src,
  license,
}: OprnSouceItemProps) => {
  return (
    <li className="shadow-border p-2">
      <p>
        <span className="point-value text-xl">{name}</span> {version}
      </p>
      <a href={src} className="text-cusorange">
        {src}
      </a>
      <p>Copyright (c) {copyright}</p>
      <p>{license}</p>
    </li>
  );
};

const OpenFontItem = ({
  name,
  copyright,
  src,
  license,
}: Omit<OprnSouceItemProps, "version">) => {
  return (
    <li className="shadow-border p-2">
      <p>
        <span className="point-value text-xl">{name}</span>
      </p>
      <a href={src} className="text-cusorange">
        {src}
      </a>
      <div>
        <p>Copyright (c) {copyright},</p>
        <p>with Reserved {name}</p>
      </div>
      <p>{license}</p>
    </li>
  );
};
