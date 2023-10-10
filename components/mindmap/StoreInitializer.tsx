"use client";
import { useRef } from "react";
import useMindmapStore from "@/lib/store";
import {Node, Edge} from 'reactflow';

const StoreInitializer = ({nodes, edges}: {nodes: Node[], edges: Edge[]}) => {
    const initialized = useRef(false)
    if(!initialized.current){
        useMindmapStore.setState({nodes, edges});
        initialized.current = true;
    }
    return null
}
 
export default StoreInitializer;