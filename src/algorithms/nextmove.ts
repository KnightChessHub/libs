export const nextPossibleMoves=(index: number, key: string)=>{
    switch(key){
        case "WP":
            if (index - 8 <0)
                return []
            else if (index - 16 <0)
                return [index+8]
            else
                return [index - 8, index - 16]

        default:
            return []
    }
}