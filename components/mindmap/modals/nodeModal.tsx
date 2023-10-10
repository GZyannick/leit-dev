"use client"

// TODO ajouter la suppresion de la modal aux onDrag
import { useCallback, useEffect, useState } from "react"

type NodeModalType = {
    position: {x: number, y: number, height: number, width: number},
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    currentId: number | undefined,
}

const NodeModal = (params: NodeModalType) => {


    const handleChange = useCallback((e: Event) => {
        if(e.target != document.getElementById('node-modal')){
            return params.setIsOpen(false)
        } 
    },[params.isOpen]);

    useEffect(() => {
        if(!params.isOpen) return;
        
        const div = document.getElementById('node-modal')

        // position the modal on top of selected node
        
        if(div){
            div.style.top = params.position.y - (div.getBoundingClientRect().height + 8) + 'px'
            div.style.left = params.position.x + 'px'
        } 

        document.addEventListener('click', handleChange)
        return () => {
            document.removeEventListener('click', handleChange)
        }
    }, [params.isOpen])


    
    return ( 
        <div id='node-modal' className={`absolute rounded p-2 flex bg-slate-600 items-center z-10 ${params.isOpen ? "block": "hidden"}`}>
            
        </div>
     );
}
 
export default NodeModal;