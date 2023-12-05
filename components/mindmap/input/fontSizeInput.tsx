"use client";

// <div>
//   {/* input fontSize peut etre deplacer dans la nodeModal */}
//   <p className="text-sm">font size</p>
//   <div className="flex items-center">
//     <input
//       type="number"
//       defaultValue={16}
//       min={8}
//       max={128}
//       className="w-12"
//       onChange={(e) => updateGlobalFontSizeStyle(e.target.value)}
//     />
//     <p>px</p>
//   </div>
// </div>;

const FontSizeInput = (params: {
  title: string;
  fontSize: string;
  setValue: (value: string) => void;
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
          onChange={(e) => params.setValue(e.target.value)}
          name="fontSize"
          id="fontSize"
        />
      </div>
    </div>
  );
};

export default FontSizeInput;
