import Square from "../square/Square";

const Board=()=>{
    return(
        <div className="w-full border aspect-square grid grid-rows-8">
            {
                Array.from({length: 8}).map((_, row)=>(
                    <div className="w-full grid grid-cols-8 border">
                        {
                            Array.from({length: 8}).map((_, col)=>{
                                    const index = 8* row + col
                                    return <Square index={index}/>
                                }
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Board;