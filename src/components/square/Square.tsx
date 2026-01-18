const Square=({index, object, isSelected, setSelectedIndex}:{index: number, object: String, isSelected: boolean, setSelectedIndex:(e:number)=>void})=>{
    const isDark = (index + Math.floor(index/8))%2==0;
    return(
        <div onClick={()=>setSelectedIndex(index)} className={`w-full cursor-pointer aspect-square flex items-center justify-center relative ${isSelected ? "opacity-80" : ""}`} style={{backgroundColor:`${isDark ? "green": "whute"}`}}>
            { isSelected && <div className="absolute w-full h-full bg-yellow-500/40"></div> }
            {object}
        </div>
    )
}

export default Square;