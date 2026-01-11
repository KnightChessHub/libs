import PlayingArea from "./PlayingArea";
type FileType  = Record<number, string>

const files: FileType = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h'}

const Board=()=>{
    return(
        <div className="w-full border flex">
            <div className="min-h-full">
                <div className="w-6 h-6"></div>
                <div className="w-6 grid grid-rows-8 h-[calc(100%-48px)]">
                    {
                        Array.from({length: 8}).map((_,index)=>(
                            <div className="border flex items-center justify-center">
                                {7-index}
                            </div>
                        ))
                    }
                </div>
                <div className="w-6 h-6"></div>
            </div>
            <div className="w-full">
                <div className="w-full h-6 grid grid-cols-8">
                    {
                        Array.from({length: 8}).map((_,index)=>(
                            <div className="border flex items-center justify-center">
                                {files[`${index}`]}
                            </div>
                        ))
                    }
                </div>
                <PlayingArea/>
                <div className="w-full h-6 grid grid-cols-8">
                    {
                        Array.from({length: 8}).map((_,index)=>(
                            <div className="border flex items-center justify-center">
                                {files[`${index}`]}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="min-h-full">
                <div className="w-6 h-6"></div>
                <div className="w-6 grid grid-rows-8 h-[calc(100%-48px)]">
                    {
                        Array.from({length: 8}).map((_,index)=>(
                            <div className="border flex items-center justify-center">
                                {7-index}
                            </div>
                        ))
                    }
                </div>
                <div className="w-6 h-6"></div>
            </div>
        </div>
    )
}

export default Board;