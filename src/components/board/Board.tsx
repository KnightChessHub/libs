import PlayingArea from "./PlayingArea";
type FileType  = Record<number, string>

const files: FileType = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h'}

const Board=()=>{
    const isLeft = true
    const isRight = false

    return(
        <div className="w-full border flex">
            {
                isLeft && (
                    <div className="min-h-full">
                        <div className="w-6 h-6"></div>
                        <div className="w-6 grid grid-rows-8" style={{ height: `calc(100% - ${isRight ? 48 : 24}px)` }}>
                            {
                                Array.from({length: 8}).map((_,index)=>(
                                    <div className="border flex items-center justify-center text-xs">
                                        {7-index}
                                    </div>
                                ))
                            }
                        </div>
                        { isRight && <div className="w-6 h-6"></div> }
                    </div>
                )
            }
            <div className="w-full">
                {
                    isLeft && (
                        <div className="w-full h-6 grid grid-cols-8">
                            {
                                Array.from({length: 8}).map((_,index)=>(
                                    <div className="border flex items-center justify-center text-xs">
                                        {files[`${index}`]}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <PlayingArea/>
                {
                    isRight && (
                        <div className="w-full h-6 grid grid-cols-8">
                            {
                                Array.from({length: 8}).map((_,index)=>(
                                    <div className="border flex items-center justify-center text-xs">
                                        {files[`${index}`]}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                isRight && (
                    <div className="min-h-full">
                        { isLeft && <div className="w-6 h-6"></div> }
                        <div className="w-6 grid grid-rows-8" style={{ height: `calc(100% - ${isLeft ? 48 : 24}px)` }}>
                            {
                                Array.from({length: 8}).map((_,index)=>(
                                    <div className="border flex items-center justify-center text-xs">
                                        {7-index}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-6 h-6"></div>
                    </div>
                )
            }
        </div>
    )
}

export default Board;