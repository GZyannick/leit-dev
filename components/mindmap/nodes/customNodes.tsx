"use client";

import useMindmapStore from "@/lib/new-store";
import { useCallback } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { NodeData } from "@/lib/types";

export const MindMapNode = ({
  id,
  data,
  isConnectable,
}: NodeProps<NodeData>) => {
  const { updateContentValue } = useMindmapStore();
  const onBlur = useCallback((evt: any) => {
    // permet de modifier le text ewt l'enregistrer dans zustand
    updateContentValue({ value: evt.currentTarget.textContent, nodeId: id });
  }, []);

  return (
    <div
      className="dnd-node tex-center  border-b-2 border-red-500 px-8 py-2 hover:shadow-xl focus:shadow-xl"
      id={id}
      style={{
        borderColor: data.style.background,
        color: data.style.color,
        fontSize: `${data.style.fontSize}`,
      }}
    >
      <div
        contentEditable
        className="nodrag px-2 empty:before:text-zinc-400  empty:before:content-[attr(data-placeholder)] hover:cursor-pointer "
        data-placeholder="text"
        onBlur={onBlur}
        suppressContentEditableWarning={true}
      >
        {data.value}
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        style={{ background: data.style.background, top: "95%" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: data.style.background, top: "95%" }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export const BackgroundNode = ({
  id,
  data,
  isConnectable,
}: NodeProps<NodeData>) => {
  const { updateContentValue, nodes } = useMindmapStore();
  const onBlur = useCallback((evt: any) => {
    // permet de modifier le text evt l'enregistrer dans zustand
    updateContentValue({ value: evt.currentTarget.textContent, nodeId: id });
  }, []);

  return (
    <div
      className="dnd-node mx-auto  my-auto rounded-lg  px-8 py-2 text-center hover:shadow-xl focus:shadow-xl "
      id={id}
      style={{
        background: data.style.background,
        color: data.style.color,
        fontSize: `${data.style.fontSize}`,
      }}
    >
      <div
        contentEditable
        className="nodrag px-2 empty:before:text-zinc-400  empty:before:content-[attr(data-placeholder)] hover:cursor-pointer"
        data-placeholder="text"
        onBlur={onBlur}
        suppressContentEditableWarning={true}
      >
        {data.value}
      </div>

      <Handle
        type="source"
        position={Position.Left}
        id="c"
        style={{ background: data.style.background }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="d"
        style={{ background: data.style.background }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="e"
        style={{ background: data.style.background }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="f"
        style={{ background: data.style.background }}
        isConnectable={isConnectable}
      />
    </div>
  );
};
