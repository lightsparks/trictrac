// src/composables/useBoard.ts

import { reactive, readonly } from 'vue';

/** Two player colors */
export type Color = 'white' | 'black';

/** State of a single point (1..24) */
export interface PointState {
    count: number;        // number of checkers on that point
    color: Color | null;  // whose checkers: 'white' | 'black' | null if empty
}

/** “Bar” state: how many checkers each player has on the bar */
export interface BarState {
    white: number;
    black: number;
}

/** “Born‐off” state: how many checkers each player has borne off */
export interface BearOffState {
    white: number;
    black: number;
}

/** The full board state */
export interface BoardState {
    points: Record<1 | 2 | 3 | 4 | 5 | 6
        | 7 | 8 | 9 | 10 | 11 | 12
        | 13 | 14 | 15 | 16 | 17 | 18
        | 19 | 20 | 21 | 22 | 23 | 24, PointState>;
    bar: BarState;
    borneOff: BearOffState;
}

/** Helper: build an “empty” BoardState (all points empty, 15 on each bar, 0 borne off) */
function createEmptyBoard(): BoardState {
    const points = {} as BoardState['points'];
    for (let i = 1; i <= 24; i++) {
        points[i as 1 | 2 | 3 | 4 | 5 | 6
            | 7 | 8 | 9 | 10 | 11 | 12
            | 13 | 14 | 15 | 16 | 17 | 18
            | 19 | 20 | 21 | 22 | 23 | 24] = {
            count: 0,
            color: null,
        };
    }
    return {
        points,
        bar: { white: 15, black: 15 },
        borneOff: { white: 0, black: 0 },
    };
}

/** The reactive state object */
const state = reactive<BoardState>(createEmptyBoard());

/**
 * Attempt to enter a checker from the bar for `player` onto `pointIndex`.
 * Returns true if the move succeeded, otherwise false.
 *
 * Dutch TricTrac rules for bar‐entry:
 *  - White must enter onto points 1..6 (their “entry quadrant”).
 *  - Black must enter onto points 19..24 (their “entry quadrant”).
 *  - You cannot enter if destination is “blocked” (2+ opposing checkers).
 *  - If destination has exactly 1 opposing checker, you “hit” it to its bar.
 */
function enterFromBar(player: Color, pointIndex: number): boolean {
    // 1) Check bar has at least one checker
    if (state.bar[player] === 0) {
        return false;
    }

    // 2) Determine the legal entry range
    const validRange = player === 'white' ? [1, 6] : [19, 24];
    if (pointIndex < validRange[0] || pointIndex > validRange[1]) {
        return false;
    }

    // 3) Check if destination is blocked
    const dest = state.points[pointIndex as keyof typeof state.points];
    if (dest.color && dest.color !== player && dest.count >= 2) {
        // Blocked by 2+ opposing checkers
        return false;
    }

    // 4) Perform the move:
    //   a) Remove one from bar
    state.bar[player]--;

    //   b) If destination has exactly 1 opposing checker, “hit” it back to their bar
    if (dest.color && dest.color !== player && dest.count === 1) {
        const enemyColor = dest.color;
        // Send that one home
        state.bar[enemyColor]++;
        // Now place the new checker
        dest.color = player;
        dest.count = 1;
    } else {
        // Destination is either empty or already owned by “player”
        if (dest.count === 0) {
            dest.color = player;
            dest.count = 1;
        } else {
            dest.count++;
        }
    }

    return true;
}

/**
 * (Future) You’ll add other move functions here, e.g. moveWithinBoard, bearOff, etc.
 */

/** Expose state as readonly plus our action */
export function useBoard() {
    return {
        boardState: readonly(state) as BoardState,
        enterFromBar,
        // later we’ll add moveWithinBoard, bearOff, resetBoard, etc.
    };
}
