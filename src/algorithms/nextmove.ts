export const nextPossibleMoves=(index: number, key: string)=>{
    switch(key){
        case "P":
            if (index + 8 > 64)
                return []
            else if (index + 16 > 64)
                return [index+8]
            else
                return [index + 8, index + 16]

        default:
            return []
    }
}