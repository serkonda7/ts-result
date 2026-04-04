import { describe, expect, test } from 'bun:test'
import { err, ok, unwrap } from './result'

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

describe('err', () => {
	test('result with Error', () => {
		const failure = new Error('boom')
		const res = err(failure)

		expect(res).toEqual({ error: failure })
		expect(res.value).toBeUndefined()
	})

	test('result with string error', () => {
		const res = err('failure')

		expect(res).toEqual({ error: 'failure' })
		expect(res.value).toBeUndefined()
	})

	test('custom error payload', () => {
		const res = err({ code: 'E_INVALID', message: 'invalid input' })

		expect(res.error).toEqual({ code: 'E_INVALID', message: 'invalid input' })
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
