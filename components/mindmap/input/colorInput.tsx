"use client";

export const ColorInput = (params: {
  title: string;
  color: string;
  type?: string;
  setValue: (value: string, type?: string) => void;
}) => {
  return (
    <div className="mx-2 mb-2">
      {/* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14); */}
      <p className="text-xs text-[#4E4E4E]">{params.title}</p>
      <div className="flex items-center rounded p-1 shadow-[0_2px_4px_0px_rgba(0,0,0,0.14)]">
        <input
          type="color"
          className="mr-2 h-6 w-5 bg-transparent shadow-none "
          value={params.color}
          onChange={(e) => {
            params.type
              ? params.setValue(e.target.value, params.type)
              : params.setValue(e.target.value);
          }}
          name="bordure"
          id="bordure"
        />
        <input
          type="text"
          value={params.color}
          onChange={(e) => {
            params.type
              ? params.setValue(e.target.value, params.type)
              : params.setValue(e.target.value);
          }}
          className="w-16 text-sm"
        />
      </div>
    </div>
  );
};
