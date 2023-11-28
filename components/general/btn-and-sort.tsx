import { Button } from "@/components/ui/button";

const BtnAndSort = ({ sort, children }: { sort: string[]; children: any }) => {

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 text-sm text-[#4E4E4E]	">
        {sort.map((name, key) => (
          <p key={`sort-${key}`}>{name}</p>
        ))}
      </div>

      <div className="flex items-center gap-6">{children}</div>
    </div>
  );
};

export default BtnAndSort;
