import { useState } from "react";
import Square from "../square/Square";

const positions =[["R", "N", "B", "K", "Q", "B", "N", "R"],["P", "P", "P", "P", "P", "P", "P", "P"],["", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", ""],["P", "P", "P", "P", "P", "P", "P", "P"],["R", "N", "B", "K", "Q", "B", "N", "R"]]

const PlayingArea=()=>{
    const [selectedIndex, setSelectedIndex] = useState(0);

    return(
        <div className="w-full border aspect-square grid grid-rows-8">
            {
                Array.from({length: 8}).map((_, row)=>(
                    <div key={row} className="w-full grid grid-cols-8">
                        {
                            Array.from({length: 8}).map((_, col)=>{
                                    const index = 8* row + col
                                    return <Square setSelectedIndex={setSelectedIndex} isSelected={index === selectedIndex} object={positions[row][col]} key={index} index={index}/>
                                }
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default PlayingArea;