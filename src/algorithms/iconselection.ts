import pawn from "../assets/pieces/p.png";
import rook from "../assets/pieces/r.png";
import bishop from "../assets/pieces/b.png";
import knight from "../assets/pieces/n.png";
import king from "../assets/pieces/k.png";
import queen from "../assets/pieces/q.png";

export const getIcon=(name:string)=>{
    var isWite = name[0]=="W";
    var piece = null;

    switch(name[1]){
        case "P":
            piece = pawn;
            return [piece, isWite];
        case "R":
            piece = rook;
            return [piece, isWite];
        case "B":
            piece = bishop;
            return [piece, isWite];
        case "N":
            piece = knight;
            return [piece, isWite];
        case "K":
            piece = king;
            return [piece, isWite];
        case "Q":
            piece = queen;
            return [piece, isWite];
        default:
            piece = null;
    }
    return [piece, isWite];
}