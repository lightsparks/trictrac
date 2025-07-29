// src/composables/useDice.ts

import { ref, readonly } from 'vue';

export type Color = 'white' | 'black';

/** A pair of dice, e.g. [3,5], or null if not rolled yet */
const dice = ref<[number, number] | null>(null);

/** The “bag” of remaining pips to play this turn, e.g. [3,5] or [1,1,2,2,5,5,6,6] for 1-2 special */
const remainingMoves = ref<number[]>([]);

/** Which player’s turn it is right now */
const currentPlayer = ref<Color>('white');

/**
 * shuffle an array in place (Fisher–Yates).
 * We’ll use this if you want to randomize pip order for non-TricTrac rolls.
 */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Roll two dice and populate `dice` and `remainingMoves` according to Dutch rules:
 *  • If you roll (1,2) or (2,1): that’s a “TricTrac” → pips = [1,1,2,2,5,5,6,6]
 *  • Else if you roll doubles (e.g. [4,4]): pips = [4,4,3,3] (where 3 = 7-4), in any order
 *  • Otherwise (e.g. [3,5]): pips = [3,5] (order doesn’t matter for Dutch TricTrac).
 */
function rollDice() {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    dice.value = [d1, d2];

    // Check special “TricTrac” (1-2 or 2-1)
    if ((d1 === 1 && d2 === 2) || (d1 === 2 && d2 === 1)) {
        // 1-2 → [1,1,2,2,5,5,6,6]
        remainingMoves.value = [1,1,2,2,5,5,6,6];
    }
    // Doubles (e.g. [4,4]) → [4,4,3,3], where 3 = 7-4
    else if (d1 === d2) {
        const otherPip = 7 - d1;
        // You may optionally shuffle the order, but Dutch rules let you choose any sequence.
        remainingMoves.value = shuffle([d1, d1, otherPip, otherPip]);
    }
    // Ordinary roll (e.g. [3,5]) → [3,5]
    else {
        remainingMoves.value = shuffle([d1, d2]);
    }
}

/**
 * Switch to the other player, reset dice & remainingMoves
 */
function switchPlayer() {
    currentPlayer.value = currentPlayer.value === 'white' ? 'black' : 'white';
    dice.value = null;
    remainingMoves.value = [];
}

export function useDice() {
    return {
        dice: readonly(dice),
        remainingMoves: readonly(remainingMoves),
        currentPlayer: readonly(currentPlayer),
        rollDice,
        switchPlayer,
    };
}
