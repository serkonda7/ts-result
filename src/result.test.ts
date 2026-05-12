import { describe, expect, test } from 'bun:test'
import { err, ok, type Result, unwrap } from './result'

describe('ok', () => {
	test('create results', () => {
		const text = ok('done')
		const boolean = ok(true)
		const array = ok([1, 2, 3])

		expect(text.value).toBe('done')
		expect(boolean.value).toBe(true)
		expect(array.value).toEqual([1, 2, 3])

		expect(text.error).toBeUndefined()
	})
})

describe('err and error types', () => {
	test('result with Error', () => {
		const failure = new Error('boom')
		const res = err(failure)

		expect(res.error).toBeInstanceOf(Error)
		expect(res).toEqual({ error: failure })
		expect(res.value).toBeUndefined()
	})

	test('result with string error', () => {
		const res = err('failure')

		expect(res).toEqual({ error: 'failure' })
		expect(res.value).toBeUndefined()
	})
})

describe('unwrap', () => {
	test('ok value', () => {
		const result = ok(42)

		expect(unwrap(result)).toBe(42)
	})

	test('returns the same object reference for object values', () => {
		const payload = { id: 1, name: 'item' }

		expect(unwrap(ok(payload))).toBe(payload)
	})

	test('throws when unwrapping an Error', () => {
		const failure = new Error('kaboom')

		expect(() => unwrap(err(failure))).toThrow(failure)
	})

	test('throws non-Error payloads as-is', () => {
		expect(() => unwrap(err('failure'))).toThrow('failure')
	})
})

describe('integration tests', () => {
	function my_fun(force_fail: boolean): Result<number> {
		if (force_fail) {
			return err('forced failure')
		}

		return ok(123)
	}

	test('success case', () => {
		const res = my_fun(false)

		expect(res.value).toBe(123)
		expect(res.error).toBeUndefined()
	})

	test('failure case', () => {
		const res = my_fun(true)

		expect(res.error).toBe('forced failure')
		expect(res.value).toBeUndefined()
	})
})
