import Link from "next/link";

export default function Navigator() {
  return (
    <nav className="flex sm:flex-col items-center gap-2 justify-center sm:justify-start sm:p-4 sm:shadow-border">
      <div className=" self-center">MealMory</div>
      <div className="hidden sm:flex flex-col gap-2">
        {[
          { title: "메인", link: "/home" },
          { title: "통계", link: "/graph" },
          { title: "프로필", link: "/profile" },
          { title: "더보기", link: "/more" },
        ].map(({ title, link }) => (
          <NavItem key={title} title={title} link={link} />
        ))}
      </div>
    </nav>
  );
}

const NavItem = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link className="flex gap-1 active:font-bold" href={link}>
      {title}
    </Link>
  );
};
