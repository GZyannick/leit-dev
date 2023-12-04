"use client";

import { Panel } from "reactflow";
import ColorInput from "@/components/mindmap/input/colorInput";
import { shallow } from "zustand/shallow";
import useMindmapStore from "@/lib/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Undo2, Redo2 } from "lucide-react";

const selector = (state: any) => ({
  mindMapName: state.mindMapName,
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
    mindMapName,
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
    <Panel position="top-right" className="h-full  " style={{ marginTop: 0 }}>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex w-72 items-center justify-between">
          <div>
            <Button variant="outline">
              <Undo2 />
            </Button>
            <Button variant="outline">
              <Redo2 />
            </Button>
          </div>
          <Button variant="outline">
            <ArrowBigLeft />
          </Button>
        </div>

        <Card className="mt-6 w-72 text-[#4E4E4E]">
          <CardHeader>
            <CardTitle className="text-lg ">{mindMapName}</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <p>Nodes</p>
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
            <Separator className="my-4" />
            <p>General</p>
            <div className="mt-2 grid grid-cols-2">
              <ColorInput
                title="Fill"
                setValue={updateGlobalColorStyle}
                color={color}
              />
              <ColorInput
                title="Background"
                setValue={updateGlobalBackgroundStyle}
                color={background}
              />
              <ColorInput
                title="Stroke"
                setValue={updateGlobalStrokeStyle}
                color={stroke}
              />
              <ColorInput
                title="Text"
                setValue={updateGlobalColorStyle}
                color={color}
              />
              <ColorInput
                title="Font"
                setValue={updateGlobalColorStyle}
                color={color}
              />
              <ColorInput
                title="Font Size"
                setValue={updateGlobalColorStyle}
                color={color}
              />
            </div>
            <Separator className="my-4" />
          </CardContent>
        </Card>
      </div>
    </Panel>
  );
};

export default ReactFlowMenu;
