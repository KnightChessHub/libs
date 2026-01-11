const Square=({index}:{index: number})=>{
    const isDark = (index + Math.floor(index/8))%2==0;
    return(
        <div className="w-full aspect-square flex items-center justify-center" style={{backgroundColor:`${isDark ? "green": "whute"}`}}>
            {index}
        </div>
    )
}

export default Square;