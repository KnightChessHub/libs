import pawn from "../assets/pieces/p.png";
import rook from "../assets/pieces/r.png";
import bishop from "../assets/pieces/b.png";
import knight from "../assets/pieces/n.png";
import king from "../assets/pieces/k.png";
import queen from "../assets/pieces/q.png";

const showIcon=(piece: string, isWite: boolean)=>{
    return(
        <div>
            <img style={{color:`${isWite? "white": "black"}`}} className="w-10" src={piece}/>
        </div>
    )
}

export const getIcon=(name:string)=>{
    var isWite = name[0]=="W";
    var piece = null;

    switch(name[1]){
        case "P":
            piece = pawn;
            return showIcon(piece, isWite);
        case "R":
            piece = rook;
            return showIcon(piece, isWite);
        case "B":
            piece = bishop;
            return showIcon(piece, isWite);
        case "N":
            piece = knight;
            return showIcon(piece, isWite);
        case "K":
            piece = king;
            return showIcon(piece, isWite);
        case "Q":
            piece = queen;
            return showIcon(piece, isWite);
        default:
            piece = piece;
            return showIcon("", isWite);
    }
}