export const nextPossibleMoves = (index: number, key: string, board: string[][]) => {
    if (!key) return [];
    
    const moves: number[] = [];
    const color = key[0]; // 'W' or 'B'
    const type = key[1];
    
    const row = Math.floor(index / 8);
    const col = index % 8;

    const isEnemy = (targetIndex: number) => {
        const targetRow = Math.floor(targetIndex / 8);
        const targetCol = targetIndex % 8;
        const piece = board[targetRow][targetCol];
        return piece !== "" && piece[0] !== color;
    };

    const isEmpty = (targetIndex: number) => {
        const targetRow = Math.floor(targetIndex / 8);
        const targetCol = targetIndex % 8;
        return board[targetRow][targetCol] === "";
    };

    const addSlideMoves = (directions: number[][]) => {
        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const targetIndex = r * 8 + c;
                if (isEmpty(targetIndex)) {
                    moves.push(targetIndex);
                } else {
                    if (isEnemy(targetIndex)) {
                        moves.push(targetIndex);
                    }
                    break;
                }
                r += dr;
                c += dc;
            }
        }
    };

    switch (type) {
        case "P": {
            const direction = color === "W" ? -1 : 1;
            const startRow = color === "W" ? 6 : 1;

            // Forward move
            const forward1 = (row + direction) * 8 + col;
            if (row + direction >= 0 && row + direction < 8 && isEmpty(forward1)) {
                moves.push(forward1);
                // Double jump
                const forward2 = (row + 2 * direction) * 8 + col;
                if (row === startRow && isEmpty(forward2)) {
                    moves.push(forward2);
                }
            }

            // Captures
            for (const dc of [-1, 1]) {
                const targetRow = row + direction;
                const targetCol = col + dc;
                if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
                    const targetIndex = targetRow * 8 + targetCol;
                    if (isEnemy(targetIndex)) {
                        moves.push(targetIndex);
                    }
                }
            }
            break;
        }

        case "N": {
            const jumps = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            for (const [dr, dc] of jumps) {
                const r = row + dr;
                const c = col + dc;
                if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                    const targetIndex = r * 8 + c;
                    if (isEmpty(targetIndex) || isEnemy(targetIndex)) {
                        moves.push(targetIndex);
                    }
                }
            }
            break;
        }

        case "B":
            addSlideMoves([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
            break;

        case "R":
            addSlideMoves([[-1, 0], [1, 0], [0, -1], [0, 1]]);
            break;

        case "Q":
            addSlideMoves([[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);
            break;

        case "K": {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const r = row + dr;
                    const c = col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const targetIndex = r * 8 + c;
                        if (isEmpty(targetIndex) || isEnemy(targetIndex)) {
                            moves.push(targetIndex);
                        }
                    }
                }
            }
            break;
        }
    }

    return moves;
};