const Square=({index}:{index: number})=>{
    return(
        <div className="w-full aspect-square flex items-center justify-center border">
            {index}
        </div>
    )
}

export default Square;