const Square=({index, object}:{index: number, object: String})=>{
    const isDark = (index + Math.floor(index/8))%2==0;
    return(
        <div className="w-full aspect-square flex items-center justify-center" style={{backgroundColor:`${isDark ? "green": "whute"}`}}>
            {object}
        </div>
    )
}

export default Square;