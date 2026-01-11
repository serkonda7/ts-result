// SPDX-FileCopyrightText: 2026-present Lukas Neubert <lukas.neubert@proton.me>
// SPDX-License-Identifier: MIT

/**
 * Result utilities inspired by Rust's Result<T, E> type.
 *
 * This module provides a way to enforce explicit error handling.
 */

/** */
type Ok<V> = {
	value: V
	error?: never
}

type Err<E> = {
	error: E
	value?: never
}

/**
 * Union type representing either success or failure.
 */
export type Result<V, E = Error> = Ok<V> | Err<E>

/**
 * Helper to create a successful Result.
 */
export const ok = <V>(value: V): Ok<V> => ({ value })

/**
 * Helper to create a failed Result.
 */
export const err = <E>(error: E): Err<E> => ({ error })

/**
 * Returns the `value` from a Result.
 *
 * In case of an error, it is thrown.
 */
export function unwrap<V, E extends Error>(result: Result<V, E>): V {
	if ('error' in result) {
		throw result.error
	}

	return result.value
}
