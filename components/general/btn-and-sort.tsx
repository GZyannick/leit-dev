import { Button } from "@/components/ui/button";
import { BtnAndSortType } from "@/lib/types";

const BtnAndSort = ({ sortingMethods, children }: BtnAndSortType) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 text-sm text-[#4E4E4E]	">
        {sortingMethods?.map(({ name, setState, state }, key) => (
          <p key={`sort-${key}`} onClick={() => setState(!state)}>
            {name}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-6">{children}</div>
    </div>
  );
};

export default BtnAndSort;
