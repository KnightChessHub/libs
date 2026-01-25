import pawn from "../assets/pieces/p.png";
import rook from "../assets/pieces/r.png";
import bishop from "../assets/pieces/b.png";
import knight from "../assets/pieces/n.png";
import king from "../assets/pieces/k.png";
import queen from "../assets/pieces/q.png";

import whitepawn from "../assets/pieces/wp.png";
import whiterook from "../assets/pieces/wr.png";
import whitebishop from "../assets/pieces/wb.png";
import whiteknight from "../assets/pieces/wn.png";
import whiteking from "../assets/pieces/wk.png";
import whitequeen from "../assets/pieces/wq.png";

const showIcon=(blackpiece: string, whitepiece: string, isWite: boolean)=>{
    return(
        <div className="cursor-not-allowed">
            {
                !isWite ? <img style={{color:`${isWite? "white": "black"}`}} className="w-10 cursor-not-allowed" src={blackpiece}/> :
                <img style={{color:`${isWite? "white": "black"}`}} className="w-10 cursor-not-allowed" src={whitepiece}/>
            }          
        </div>
    )
}

export const getIcon=(name:string)=>{
    var isWite = name[0]=="W";
    var piece = null;

    switch(name[1]){
        case "P":
            piece = pawn;
            return showIcon(piece, whitepawn, isWite);
        case "R":
            piece = rook;
            return showIcon(piece, whiterook, isWite);
        case "B":
            piece = bishop;
            return showIcon(piece, whitebishop, isWite);
        case "N":
            piece = knight;
            return showIcon(piece, whiteknight, isWite);
        case "K":
            piece = king;
            return showIcon(piece, whiteking, isWite);
        case "Q":
            piece = queen;
            return showIcon(piece, whitequeen, isWite);
        default:
            piece = piece;
            return showIcon("", "", isWite);
    }
}