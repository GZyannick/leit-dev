import { ColorInput } from "./colorInput";
import { FontSizeInput } from "./fontSizeInput";

type ReactflowMenuDragInputType = {
  background: string;
  color: string;
};

type ReactflowMenuInputsType = {
  fontSize: string;
  children?: React.ReactNode;
  updateStyle: (value: string, type?: string) => void;
} & ReactflowMenuDragInputType;

export const ReactflowMenuDragInput = ({
  background,
  color,
}: ReactflowMenuDragInputType) => {
  // on drag object transfer to reactflow to add it in the canvas
  const onDragStart = (e: any, nodeType: any) => {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div id="lt-nodes" className="mt-3">
      <ul className="flex items-center">
        <li
          className="text-m mr-4 rounded border px-4 py-1 transition ease-in hover:scale-105"
          style={{ background: background, color: color }}
          onDragStart={(e) => onDragStart(e, "background")}
          draggable
        >
          node
        </li>

        <li
          className=" text-m border-b-2 px-4 py-1 text-center transition ease-in hover:scale-105"
          style={{ borderColor: background, color: color }}
          onDragStart={(e) => onDragStart(e, "mindMap")}
          draggable
        >
          node
        </li>
      </ul>
    </div>
  );
};

export const ReactflowMenuInputs = ({
  background,
  color,
  fontSize,
  updateStyle,
  children,
}: ReactflowMenuInputsType) => {
  return (
    <>
      <ColorInput
        title="Background"
        setValue={updateStyle}
        type="bg"
        color={background}
      />
      <ColorInput
        title="Text"
        setValue={updateStyle}
        type="text"
        color={color}
      />
      <FontSizeInput
        title="Font Size"
        type="fs"
        setValue={updateStyle}
        fontSize={fontSize}
      />

      {children}
    </>
  );
};
