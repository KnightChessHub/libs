import { useEffect, useState } from "react";
import Square from "../square/Square";
import { nextPossibleMoves } from "../../algorithms/nextmove";
import { getIcon } from "../../algorithms/iconselection";

const positions =[["BR", "", "", "BK", "BQ", "BB", "BN", ""],["BP", "BP", "BP", "BP", "BP", "BP", "BP", ""],["", "", "", "", "WN", "", "", "BP"],["", "", "", "BB", "", "BR", "", ""],["", "", "", "", "", "", "", ""],["WP", "BN", "", "", "", "", "", "WP"],["", "WP", "WP", "WP", "WP", "WP", "WP", ""],["WR","WN","WB","WK","WQ","WB","","WR"]]

const PlayingArea=()=>{
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [nextMoves, setNextMoves] = useState([-1]);
    const [selectedNextMove, setSelectedNextMove] = useState(-1);

    useEffect(()=>{
        console.log("selectedNextMove: ", selectedNextMove);
        console.log("prev: ", selectedIndex);
    },[selectedNextMove]);

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
                                    return <Square selectedIndex={selectedIndex} setSelectedNextMove={setSelectedNextMove} isPosibleNextMove={nextMoves.includes(index)} setSelectedIndex={setSelectedIndex} isSelected={index === selectedIndex} object={getIcon(positions[row][col])} key={index} index={index}/>
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