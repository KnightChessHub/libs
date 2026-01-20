const Square=({index, object, isSelected, setSelectedIndex, isPosibleNextMove}:{index: number, object: String, isSelected: boolean, setSelectedIndex:(e:number)=>void, isPosibleNextMove: boolean})=>{
    const isDark = (index + Math.floor(index/8))%2==0;
    return(
        <div onClick={()=>setSelectedIndex(isSelected ? 0: index)} className={`w-full cursor-pointer aspect-square flex items-center justify-center relative text-xs md:text-sm ${isSelected ? "opacity-80" : ""}`} style={{backgroundColor:`${isDark ? "green": "whute"}`}}>
            { isSelected && <div className="absolute w-full h-full bg-yellow-500/40"></div> }
            {object}
            {
                isPosibleNextMove && <div className="absolute w-full h-full flex items-center justify-center bg-yellow-100/40">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full shadow-xl border"></div>
                </div>
            }
        </div>
    )
}

export default Square;