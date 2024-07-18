import DivisionSelectComponent from "@/components/modal/division/DivistionSelectComponent";

export default function CategorySelectPage() {
  return (
    <div className="bg-black bg-opacity-35 fixed left-0 top-0 w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full md:w-[360px] sm:h-[680px] overflow-y-scroll bg-white dark:bg-cusdark sm:rounded-2xl">
        <DivisionSelectComponent />
      </div>
    </div>
  );
}
