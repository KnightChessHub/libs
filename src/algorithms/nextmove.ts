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

        case "WR":
            var ret =[]

            var x = index%8;
            var y = (index -x)/8

            for(var i=0;i<8;i++){
                if((8*i + x) != index)
                    ret.push(8*i + x);
                if((8*y + i) != index)
                    ret.push(8*y + i);        
            }
            return ret

        case "BR":
            var ret =[]

            var x = index%8;
            var y = (index -x)/8

            for(var i=0;i<8;i++){
                if((8*i + x) != index)
                    ret.push(8*i + x);
                if((8*y + i) != index)
                    ret.push(8*y + i);        
            }
            return ret

        case "WN":
            var ret =[]
            var p1 = index + 16 + 1;
            var p2 = index + 16 - 1;
            var p3 = index + 8 + 2;
            var p4 = index + 8 - 2;
            var p5 = index - 16 +1;
            var p6 = index - 16 -1;
            var p7 = index - 8 + 2;
            var p8 = index - 8 - 2;

        case "WK":
            var ret = []
            if(((index+9)-((index+9)%8))/8 == ((index+8)-((index+8)%8))/8 && (index+9<=63))
                ret.push(index+9)
            if(((index+7)-((index+7)%8))/8 == ((index+8)-((index+8)%8))/8 && (index+7<=63))
                ret.push(index+7)
            if(index+8<=63)
                ret.push(index+8) 
            if(((index+1)-((index+1)%8))/8 == ((index)-((index)%8))/8 && (index+1<=63))
                ret.push(index+1)
            if(((index-1)-((index-1)%8))/8 == ((index)-((index)%8))/8 && (index-1<=63))
                ret.push(index-1)
            if(((index-9)-((index-9)%8))/8 == ((index-8)-((index-8)%8))/8 && (index-9>=0))
                ret.push(index-9)
            if(((index-7)-((index-7)%8))/8 == ((index-8)-((index-8)%8))/8 && (index-7>=0))
                ret.push(index-7)
            if(index-8>=0)
                ret.push(index-8)

            return ret;

        case "BK":
            var ret = []
            if(((index+9)-((index+9)%8))/8 == ((index+8)-((index+8)%8))/8 && (index+9<=63))
                ret.push(index+9)
            if(((index+7)-((index+7)%8))/8 == ((index+8)-((index+8)%8))/8 && (index+7<=63))
                ret.push(index+7)
            if(index+8<=63)
                ret.push(index+8) 
            if(((index+1)-((index+1)%8))/8 == ((index)-((index)%8))/8 && (index+1<=63))
                ret.push(index+1)
            if(((index-1)-((index-1)%8))/8 == ((index)-((index)%8))/8 && (index-1<=63))
                ret.push(index-1)
            if(((index-9)-((index-9)%8))/8 == ((index-8)-((index-8)%8))/8 && (index-9>=0))
                ret.push(index-9)
            if(((index-7)-((index-7)%8))/8 == ((index-8)-((index-8)%8))/8 && (index-7>=0))
                ret.push(index-7)
            if(index-8>=0)
                ret.push(index-8)

            return ret;

        case "WQ":
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

            var x = index%8;
            var y = (index -x)/8

            for(var i=0;i<8;i++){
                if((8*i + x) != index)
                    ret.push(8*i + x);
                if((8*y + i) != index)
                    ret.push(8*y + i);        
            }

            return ret;

        case "BQ":
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

            var x = index%8;
            var y = (index -x)/8

            for(var i=0;i<8;i++){
                if((8*i + x) != index)
                    ret.push(8*i + x);
                if((8*y + i) != index)
                    ret.push(8*y + i);        
            }
            
            return ret;

        default:
            return []
    }
}