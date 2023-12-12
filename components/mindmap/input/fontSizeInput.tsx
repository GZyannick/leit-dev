"use client";

export const FontSizeInput = (params: {
  title: string;
  fontSize: string;
  type?: string;
  setValue: (value: string, type?: string) => void;
}) => {
  return (
    <div className="mx-2 mb-2">
      {/* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14); */}
      <p className="text-xs text-[#4E4E4E]">{params.title}</p>
      <div className="flex items-center rounded p-1 shadow-[0_2px_4px_0px_rgba(0,0,0,0.14)]">
        <input
          type="number"
          defaultValue={16}
          min={8}
          max={128}
          className="mr-2 block h-6 w-full bg-transparent shadow-none"
          onChange={(e) => {
            params.type
              ? params.setValue(e.target.value, params.type)
              : params.setValue(e.target.value);
          }}
          name="fontSize"
          id="fontSize"
        />
      </div>
    </div>
  );
};

export default FontSizeInput;
