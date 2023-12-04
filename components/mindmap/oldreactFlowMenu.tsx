"use client";

import { Panel } from "reactflow";
import ColorInput from "@/components/mindmap/input/colorInput";
import { shallow } from "zustand/shallow";
import useMindmapStore from "@/lib/store";
import { Card } from "../ui/card";

const selector = (state: any) => ({
  stroke: state.stroke,
  color: state.color,
  fontSize: state.fontSize,
  background: state.background,
  updateGlobalStrokeStyle: state.updateGlobalStrokeStyle,
  updateGlobalColorStyle: state.updateGlobalColorStyle,
  updateGlobalFontSizeStyle: state.updateGlobalFontSizeStyle,
  updateGlobalBackgroundStyle: state.updateGlobalBackgroundStyle,
});

const ReactFlowMenu = () => {
  const {
    stroke,
    color,
    background,
    fontSize,
    updateGlobalBackgroundStyle,
    updateGlobalFontSizeStyle,
    updateGlobalColorStyle,
    updateGlobalStrokeStyle,
  } = useMindmapStore(selector, shallow);
  // on drag object transfer to reactflow to add it in the canvas
  const onDragStart = (e: any, nodeType: any) => {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel position="top-right">
      <Card className="min-h-16 flex w-full items-center justify-between rounded-xl px-8 py-4 shadow-xl ">
        {/* CUSTOM NODES  */}
        <div id="lt-nodes">
          <ul className="flex items-center">
            <li
              className="mr-4 rounded border px-2  text-sm transition ease-in hover:scale-105"
              style={{ background: background, color: color }}
              onDragStart={(e) => onDragStart(e, "background")}
              draggable
            >
              node
            </li>

            <li
              className="mb-2 border-b-2 border-red-500 px-2 text-center text-sm transition ease-in hover:scale-105"
              style={{ borderColor: background, color: color }}
              onDragStart={(e) => onDragStart(e, "mindMap")}
              draggable
            >
              node
            </li>
          </ul>
        </div>

        {/* CUSTOM GENERAL OPTIONS */}
        <div className="flex items-center justify-between">
          <div className="mr-4">
            {/* input text color */}
            <ColorInput
              title="Text"
              setValue={updateGlobalColorStyle}
              color={color}
            />
          </div>
          <div>
            {/* input bg color */}
            <ColorInput
              title="bg"
              setValue={updateGlobalBackgroundStyle}
              color={background}
            />
          </div>

          <div>
            {/* input stroke color */}
            <ColorInput
              title="stroke"
              setValue={updateGlobalStrokeStyle}
              color={stroke}
            />
          </div>

          <div>
            {/* input fontSize peut etre deplacer dans la nodeModal */}
            <p className="text-sm">font size</p>
            <div className="flex items-center">
              <input
                type="number"
                defaultValue={16}
                min={8}
                max={128}
                className="w-12"
                onChange={(e) => updateGlobalFontSizeStyle(e.target.value)}
              />
              <p>px</p>
            </div>
          </div>
        </div>

        <div>C</div>
      </Card>
    </Panel>
  );
};

export default ReactFlowMenu;
