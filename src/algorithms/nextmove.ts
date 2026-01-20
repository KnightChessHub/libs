export const nextPossibleMoves=(index: number, key: string)=>{
    switch(key){
        case "WP":
            if (index - 8 <0)
                return []
            else if (index - 16 <0)
                return [index+8]
            else
                return [index - 8, index - 16]

        case "BP":
            if (index + 8 >63)
                return []
            else if (index + 16 >63)
                return [index+8]
            else
                return [index + 8, index + 16]

        case "BB":
            var ret =[]
            var rank = 0
            var p1_pruned = false
            var p2_pruned = false
            var p3_pruned = false
            var p4_pruned = false

            while(true){
                rank +=1
                const p1 = index + 9*rank;
                const p2 = index + 7*rank;
                const p3 = index - 7*rank;
                const p4 = index - 9*rank;

                if((p1-p1%8)/8 != ((index + 8*rank)-(index + 8*rank)%8)/8){
                    p1_pruned = true;
                }
                if((p2-p2%8)/8 != ((index + 8*rank)-(index + 8*rank)%8)/8){
                    p2_pruned = true;
                }
                if((p3-p3%8)/8 != ((index - 8*rank)-(index - 8*rank)%8)/8){
                    p3_pruned = true;
                }
                if((p4-p4%8)/8 != ((index - 8*rank)-(index - 8*rank)%8)/8){
                    p4_pruned = true;
                }
                
                if ((p1<0 || p1>63) && (p2<0 || p2>63) && (p3<0 || p3>63) && (p4<0 || p4>63)){
                    break
                }

                if (p1>=0 && p1<=63 && !(p1_pruned)){
                    ret.push(p1);
                }
                if (p2>=0 && p2<=63 && !(p2_pruned)){
                    ret.push(p2);
                }
                if (p3>=0 && p3<=63 && !(p3_pruned)){
                    ret.push(p3);
                }
                if (p4>=0 && p4<=63 && !(p4_pruned)){
                    ret.push(p4);
                }
            }
            return ret;

        case "WB":
            var ret =[]
            var rank = 0
            var p1_pruned = false
            var p2_pruned = false
            var p3_pruned = false
            var p4_pruned = false

            while(true){
                rank +=1
                const p1 = index + 9*rank;
                const p2 = index + 7*rank;
                const p3 = index - 7*rank;
                const p4 = index - 9*rank;

                if((p1-p1%8)/8 != ((index + 8*rank)-(index + 8*rank)%8)/8){
                    p1_pruned = true;
                }
                if((p2-p2%8)/8 != ((index + 8*rank)-(index + 8*rank)%8)/8){
                    p2_pruned = true;
                }
                if((p3-p3%8)/8 != ((index - 8*rank)-(index - 8*rank)%8)/8){
                    p3_pruned = true;
                }
                if((p4-p4%8)/8 != ((index - 8*rank)-(index - 8*rank)%8)/8){
                    p4_pruned = true;
                }
                
                if ((p1<0 || p1>63) && (p2<0 || p2>63) && (p3<0 || p3>63) && (p4<0 || p4>63)){
                    break
                }

                if (p1>=0 && p1<=63 && !(p1_pruned)){
                    ret.push(p1);
                }
                if (p2>=0 && p2<=63 && !(p2_pruned)){
                    ret.push(p2);
                }
                if (p3>=0 && p3<=63 && !(p3_pruned)){
                    ret.push(p3);
                }
                if (p4>=0 && p4<=63 && !(p4_pruned)){
                    ret.push(p4);
                }
            }
            return ret;

        default:
            return []
    }
}