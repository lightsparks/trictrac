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
 * Compute destination index for a move of length `pip`:
 * - White moves “up” the point numbers: fromIndex + pip
 * - Black moves “down”: fromIndex - pip
 * Returns null if destination would be beyond 1..24 (i.e. a bear‐off, handled later).
 */
function computeDestination(player: Color, fromIndex: number, pip: number): number | null {
    if (player === 'white') {
        const dest = fromIndex + pip;
        return dest <= 24 ? dest : null;
    } else {
        const dest = fromIndex - pip;
        return dest >= 1 ? dest : null;
    }
}

/**
 * Move a checker on the board by `pip` spaces.
 * Returns true if succeeded, false if move was illegal (no checker there, blocked, etc.).
 */
function moveChecker(player: Color, fromIndex: number, pip: number): boolean {
    const src = state.points[fromIndex as keyof typeof state.points];
    // 1) Must have a checker of this player at source
    if (!src.color || src.color !== player || src.count <= 0) {
        return false;
    }

    // 2) Compute the destination
    const destIndex = computeDestination(player, fromIndex, pip);
    if (destIndex === null) {
        // We’ll handle bearing‐off in a later ticket
        return false;
    }
    const dest = state.points[destIndex as keyof typeof state.points];

    // 3) Blocked? 2+ enemy checkers
    if (dest.color && dest.color !== player && dest.count >= 2) {
        return false;
    }

    // 4) Perform the move:
    //   a) Remove one from source
    src.count--;
    if (src.count === 0) src.color = null;

    //   b) If exactly one enemy, “hit” it back to its bar
    if (dest.color && dest.color !== player && dest.count === 1) {
        const enemy = dest.color;
        state.bar[enemy]++;
        // place ours
        dest.color = player;
        dest.count = 1;
    } else {
        // empty or same‐color stacking
        if (dest.count === 0) {
            dest.color = player;
            dest.count = 1;
        } else {
            dest.count++;
        }
    }

    return true;
}


export function useBoard() {
    return {
        boardState: readonly(state) as BoardState,
        enterFromBar,
        computeDestination,
        moveChecker,
        // … future actions …
    };
}