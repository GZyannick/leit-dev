"use client"

import useMindmapStore from "@/lib/store";
import { useCallback } from "react";
import { NodeProps, Node, Handle, Position } from "reactflow";

type NodeData = {
    value: string,
    isConnectable: any,
    style: {
      color: string,
      background: string,
      fontSize: string,
    }
  };
export type CustomNodeType = Node<NodeData>

const selector = (state: any) => {
    updateContentValue: state.updateContentValue
    nodes: state.nodes
}


export const MindMapNode = ({id ,data, isConnectable}: NodeProps<NodeData>) => {
    const { updateContentValue } = useMindmapStore()
    const onBlur = useCallback((evt: any) => {

        updateContentValue({value: evt.currentTarget.textContent, nodeId: id} )

      }, []);

      
    return ( 
        <div className="dnd-node border-b-2  px-8 py-2 border-red-500 hover:shadow-xl focus:shadow-xl tex-center" id={id} style={{borderColor: data.style.background, color: data.style.color, fontSize: `${data.style.fontSize}`}}>
            <div contentEditable className="nodrag empty:before:text-zinc-400 empty:before:content-[attr(data-placeholder)]  hover:cursor-pointer px-2" data-placeholder="text" onBlur={onBlur} >{data.value}</div>
            <Handle type="source" position={Position.Left} id="b" style={{background: data.style.background , top: "95%" }} isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Right} id="a" style={{background: data.style.background, top: "95%"}} isConnectable={isConnectable}/>
        </div>
     );
};




export const BackgroundNode = ({id, data, isConnectable}: NodeProps<NodeData>) => {
    const { updateContentValue, nodes } = useMindmapStore()
    const onBlur = useCallback((evt: any) => {

        updateContentValue({value: evt.currentTarget.textContent, nodeId: id} )
        console.log(nodes)
      }, []);
    
    return ( 
        <div className="dnd-node rounded-lg  px-8 py-2  hover:shadow-xl focus:shadow-xl text-center " id={id} style={{background: data.style.background, color: data.style.color, fontSize: `${data.style.fontSize}`}} >
            {/* <textarea name="textNode" id="textNode" cols={10} rows={1}>text</textarea> */}
            <div contentEditable className="nodrag empty:before:text-zinc-400 empty:before:content-[attr(data-placeholder)]  hover:cursor-pointer px-2" data-placeholder="text" onBlur={onBlur}>{data.value}</div>
            <Handle type="source" position={Position.Left} id="c" style={{background: data.style.background}}isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Right} id="d" style={{background: data.style.background}} isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Top} id="e" style={{background: data.style.background}} isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Bottom} id="f" style={{background: data.style.background}} isConnectable={isConnectable}/>
        </div>
    );
};