"use client";
// import { redirect } from "next/navigation";
import { Panel } from "reactflow";
import { ColorInput } from "@/components/mindmap/input/colorInput";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import useMindmapStore from "@/lib/new-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ReactflowMenuDragInput,
  ReactflowMenuInputs,
} from "@/components/mindmap/input/reactflowMenuInput";

import { Separator } from "@/components/ui/separator";
// import { ArrowBigLeft, Undo2, Redo2, Pencil, Save } from "lucide-react";
import { Pencil, Save } from "lucide-react";
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
  updateGlobalStyle: state.updateGlobalStyle,
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
    updateGlobalStyle,
    updateMindmapName,
    updateSpecificNodeStyle,
  } = useMindmapStore(selector, shallow);
  const [mindmapTitle, setMindmapTitle] = useState(mindMapName);

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
            <ReactflowMenuDragInput background={background} color={color} />
            <Separator className="my-4" />
            <p>General</p>
            <div className="mt-2 grid grid-cols-2">
              <ReactflowMenuInputs
                background={background}
                color={color}
                fontSize={fontSize}
                updateStyle={updateGlobalStyle}
              >
                <ColorInput
                  title="Stroke"
                  setValue={updateGlobalStyle}
                  type="stroke"
                  color={stroke}
                />
              </ReactflowMenuInputs>
            </div>
            <Separator className="my-4" />
            <p>Specific</p>
            <div className={`mt-2 grid-cols-2 ${isOpen ? "grid" : "hidden"}`}>
              <ReactflowMenuInputs
                background={background}
                color={color}
                fontSize={fontSize}
                updateStyle={updateSpecificNodeStyle}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Panel>
  );
};

export default ReactFlowMenu;
