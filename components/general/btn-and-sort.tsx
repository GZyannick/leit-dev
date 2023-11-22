import { Button } from "@/components/ui/button";

const BtnAndSort = ({ sort, btn }: { sort: string[]; btn: string[] }) => {
  console.log("hi");

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 text-sm text-[#4E4E4E]	">
        {sort.map((name, key) => (
          <p key={`sort-${key}`}>{name}</p>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {btn.map((name, key) => (
          <Button key={`btn-${key}`} className="px-12">
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BtnAndSort;
