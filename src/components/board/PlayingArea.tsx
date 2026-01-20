import { useEffect, useState } from "react";
import Square from "../square/Square";
import { nextPossibleMoves } from "../../algorithms/nextmove";

const positions =[["BR", "BN", "BB", "BK", "BQ", "BB", "BN", "BR"],["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],["", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", ""],["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],["WR","WN","WB","WK","WQ","WB","WN","WR"]]

const PlayingArea=()=>{
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [nextMoves, setNextMoves] = useState([-1]);

    useEffect(()=>{
        setNextMoves(nextPossibleMoves(selectedIndex, positions[((selectedIndex)-((selectedIndex)%8))/8][(selectedIndex)%8]))
    },[selectedIndex]);

    return(
        <div className="w-full border aspect-square grid grid-rows-8">
            {
                Array.from({length: 8}).map((_, row)=>(
                    <div key={row} className="w-full grid grid-cols-8">
                        {
                            Array.from({length: 8}).map((_, col)=>{
                                    const index = 8* row + col
                                    return <Square isPosibleNextMove={nextMoves.includes(index)} setSelectedIndex={setSelectedIndex} isSelected={index === selectedIndex} object={positions[row][col]} key={index} index={index}/>
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