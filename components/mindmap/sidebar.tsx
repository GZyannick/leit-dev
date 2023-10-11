import { Panel } from "reactflow";
import ColorInput from "@/components/mindmap/input/colorInput";
import useStore from "@/lib/store";
import { shallow } from 'zustand/shallow';


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


const Sidebar = () => {

    // on drag object transfer to reactflow to add it in the canvas
    const onDragStart = (e: any, nodeType: any) => {
        e.dataTransfer.setData('application/reactflow', nodeType);
        e.dataTransfer.effectAllowed = 'move';
    }
    const {stroke, color, background, fontSize, updateGlobalBackgroundStyle, updateGlobalFontSizeStyle, updateGlobalColorStyle, updateGlobalStrokeStyle}= useStore(selector, shallow);
    

    return (

        <Panel position="bottom-center" className="py-4 px-8 bg-white flex justify-between items-center w-2/5 min-h-16 rounded-xl shadow-xl">
            
            
            {/* CUSTOM NODES  */}
            <div id="lt-nodes">
                <ul className="flex items-center">
                    <li className="px-2 text-sm mr-4 border  rounded transition ease-in hover:scale-105"
                        style={{background: background, color: color}}
                        onDragStart={(e) => onDragStart(e, 'background')}
                        draggable >
                        node
                    </li>
                    
                    <li className="px-2 text-center mb-2 text-sm border-b-2 border-red-500 transition ease-in hover:scale-105"
                        style={{borderColor: background, color: color}}
                        onDragStart={(e) => onDragStart(e, 'mindMap')}
                        draggable >
                        node
                    </li>
                </ul>
            </div>

            {/* CUSTOM GENERAL OPTIONS */}
            <div className="flex items-center justify-between">
                <div className="mr-4">
                    {/* input text color */}
                    <ColorInput title="Text" setValue={updateGlobalColorStyle} color={color}/>
                </div>
                <div>
                    {/* input bg color */}
                    <ColorInput title="bg" setValue={updateGlobalBackgroundStyle} color={background}/>
                </div>

                <div>
                    {/* input stroke color */}
                    <ColorInput title="stroke" setValue={updateGlobalStrokeStyle} color={stroke}/>
                </div>

                <div>
                    {/* input fontSize peut etre deplacer dans la nodeModal */}
                    <p className="text-sm">font size</p>
                    <div className="flex items-center">
                        <input type='number' defaultValue={16} min={8} max={128} className="w-12" onChange={(e) => updateGlobalFontSizeStyle(e.target.value)}/>
                    <p>px</p>
                    </div>
                </div>
            </div>


            <div>C</div>
        </Panel>

 );
}
 
export default Sidebar;



{/* <aside  className=" bg-slate-50 p-4 flex flex-col">

<ul >
    <li className="px-4 mb-4 py-2 border border-black rounded transition ease-in hover:scale-105"
        onDragStart={(e) => onDragStart(e, 'input')}
        draggable >
        Basic Node
    </li>
    
    <li className="px-4 py-2 mb-4 border-b-4 border-red-500 transition ease-in hover:scale-105"
        style={{borderColor: color}}
        onDragStart={(e) => onDragStart(e, 'mindMap')}
        draggable >
        MindMap Node
    </li>
</ul>

</aside> */}

{/* <aside className=" bg-slate-50 p-4 flex flex-col items-center">
<div className="description text-center ">You can drag nodes in the pane</div>

<ul className="flex flex-col justify-around items-center mt-16">
   <li className="px-4 mb-4 py-2 border border-black rounded transition ease-in hover:scale-105"
       onDragStart={(e) => onDragStart(e, 'input')}
       draggable >
       Basic Node
   </li>
   
   <li className="px-4 py-2 mb-4 border-b-4 border-red-500 transition ease-in hover:scale-105"
       style={{borderColor: color}}
       onDragStart={(e) => onDragStart(e, 'mindMap')}
       draggable >
       MindMap Node
   </li>
</ul>

</aside> */}