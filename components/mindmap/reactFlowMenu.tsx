"use client";
// import { redirect } from "next/navigation";
import { Panel } from "reactflow";
import {
  ColorInput,
  SpecificColorInput,
} from "@/components/mindmap/input/colorInput";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import useMindmapStore from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Undo2, Redo2, Pencil, Save } from "lucide-react";
import FontSizeInput from "./input/fontSizeInput";
import DeleteDialog from "./modals/deleteDialog";
import { deleteMindmap } from "@/app/mindmap/[id]/actions";
const title = "Are you absolutely sure?";
const desc = `This action cannot be undone. This will permanently delete your
  mindmap and remove the data from our servers.`;

const selector = (state: any) => ({
  mindMapName: state.mindMapName,
  mindMapId: state.mindMapId,
  stroke: state.stroke,
  color: state.color,
  fontSize: state.fontSize,
  background: state.background,
  updateGlobalStrokeStyle: state.updateGlobalStrokeStyle,
  updateGlobalColorStyle: state.updateGlobalColorStyle,
  updateGlobalFontSizeStyle: state.updateGlobalFontSizeStyle,
  updateGlobalBackgroundStyle: state.updateGlobalBackgroundStyle,
  updateMindmapName: state.updateMindmapName,
  updateSpecificNodeStyle: state.updateSpecificNodeStyle,
});

const ReactFlowMenu = ({ isOpen }: { isOpen: Boolean }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    mindMapName,
    mindMapId,
    stroke,
    color,
    background,
    fontSize,
    updateGlobalBackgroundStyle,
    updateGlobalFontSizeStyle,
    updateGlobalColorStyle,
    updateGlobalStrokeStyle,
    updateMindmapName,
    updateSpecificNodeStyle,
  } = useMindmapStore(selector, shallow);
  const [mindmapTitle, setMindmapTitle] = useState(mindMapName);

  // on drag object transfer to reactflow to add it in the canvas
  const onDragStart = (e: any, nodeType: any) => {
    console.log("drag start");
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleIsEdit = () => {
    if (isEdit) updateMindmapName(mindmapTitle);
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    deleteMindmap(mindMapId);
  };

  return (
    <Panel position="top-right" className="h-full  " style={{ marginTop: 0 }}>
      <div className="flex h-full flex-col items-center justify-center">
        <Card className="w-72 text-[#4E4E4E]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    defaultValue={mindMapName}
                    id="mindMapName"
                    className="w-4/6"
                    onChange={(e) => {
                      setMindmapTitle(e.target.value);
                    }}
                  ></input>
                  <div>
                    <button
                      className="mr-4 transition-all duration-100 ease-in hover:text-blue-500"
                      onClick={handleIsEdit}
                    >
                      <Save size={16} />
                    </button>
                    <DeleteDialog
                      title={title}
                      desc={desc}
                      handleDelete={handleDelete}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="w-4/6 text-ellipsis	">{mindMapName}</p>
                  <div>
                    <button
                      className="mr-4 transition-all duration-100 ease-in hover:text-blue-500"
                      onClick={handleIsEdit}
                    >
                      <Pencil size={16} />
                    </button>
                    <DeleteDialog
                      title={title}
                      desc={desc}
                      handleDelete={handleDelete}
                    />
                  </div>
                </>
              )}
            </CardTitle>
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

              <FontSizeInput
                title="Font Size"
                setValue={updateGlobalFontSizeStyle}
                fontSize={fontSize}
              />
            </div>
            <Separator className="my-4" />
            <p>Specific</p>
            <div className={`mt-2 grid-cols-2 ${isOpen ? "grid" : "hidden"}`}>
              <SpecificColorInput
                title="Background"
                type="bg"
                setValue={updateSpecificNodeStyle}
                color={background}
              />

              <SpecificColorInput
                title="Text"
                setValue={updateSpecificNodeStyle}
                type="text"
                color={color}
              />

              <FontSizeInput
                title="Font Size"
                type="fs"
                setValue={updateSpecificNodeStyle}
                fontSize={fontSize}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Panel>
  );
};

export default ReactFlowMenu;

//  <div className="flex w-72 items-center justify-between">
{
  /* <div> */
}
{
  /* TODO AJOUTER ZUNDO POUR CTRL Z */
}
{
  /* <Button variant="outline">
      <Undo2 />
    </Button>
    <Button variant="outline">
      <Redo2 />
    </Button> */
}
{
  /* </div> */
}
{
  /* <Button variant="outline" onClick={() => redirect("/mindmap")}>
    <ArrowBigLeft />
  </Button> */
}
// </div>
