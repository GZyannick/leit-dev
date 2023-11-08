"use client"

const ColorInput = (params: {title: string, color: string, setValue: (value: string) => void}) => {
    // !TODO faire fonctionner les #fff en #ffffff
    return ( 
        <>
            <p className="text-sm">{params.title}</p>
            <div className="flex items-center ">
                <input type="color" className='w-5 h-6 mr-2 shadow-none bg-transparent ' value={params.color}  onChange={(e) => params.setValue(e.target.value)} name="bordure" id="bordure" />
                <input type="text"  value={params.color} onChange={(e) => params.setValue(e.target.value)} className="w-16 text-sm"/>
            </div>
        </>
     );
}
 
export default ColorInput;