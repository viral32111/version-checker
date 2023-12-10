import { DEFAULT_RESPONSE_HEADERS, SOFTWARE_NAMES } from "./config"
import { ErrorResponse, QueryParameters, Software, SuccessResponse } from "./types"

/**
 * Checks if a string is a supported software name.
 * @param value The string to check.
 * @returns Whether the string is a supported software name.
 */
export const isSoftware = (value: string): value is Software => (SOFTWARE_NAMES as readonly string[]).includes(value)

/**
 * Generates a JSON response.
 * @param data Any JSON-encodable data for the body.
 * @param statusCode The HTTP status code.
 * @param extraHeaders Any additional HTTP headers.
 * @returns A HTTP response.
 */
export const jsonResponse = (
	data: object = {},
	statusCode = 200,
	extraHeaders: Record<string, string> = {}
): Response =>
	new Response(JSON.stringify(data), {
		status: statusCode,
		headers: {
			...DEFAULT_RESPONSE_HEADERS,
			"Content-Type": "application/json; charset=utf-8",
			...extraHeaders
		}
	})

/**
 * Generates a successful JSON response.
 * @param data Any JSON-encodable data for the body.
 * @param statusCode The HTTP status code.
 * @param extraHeaders Any additional HTTP headers.
 * @returns A HTTP response.
 */
export const successResponse = (
	data: SuccessResponse,
	statusCode = 200,
	extraHeaders: Record<string, string> = {}
): Response => jsonResponse(data, statusCode, extraHeaders)

/**
 * Generates an unsuccessful JSON response.
 * @param data Any JSON-encodable data for the body.
 * @param statusCode The HTTP status code.
 * @param extraHeaders Any additional HTTP headers.
 * @returns A HTTP response.
 */
export const errorResponse = (
	data: ErrorResponse,
	statusCode = 500,
	extraHeaders: Record<string, string> = {}
): Response => jsonResponse(data, statusCode, extraHeaders)

/**
 * Converts a duration into seconds.
 * @param duration The duration to convert (e.g., 1h, 2d, 3w, 4m, 5y). Defaults to seconds if no unit is provided. Defaults to 0 seconds if no value is provided.
 * @returns The duration in seconds.
 */
export const parseDuration = (duration: string | null): number => {
	if (!duration) return 0

	// Split value & unit
	const value = parseInt(duration.slice(0, -1))
	const unit = duration.slice(-1)

	switch (unit) {
		case "s":
			return value // Seconds
		case "m":
			return value * 60 // Minutes
		case "h":
			return value * 60 * 60 // Hours
		case "d":
			return value * 60 * 60 * 24 // Days
		case "w":
			return value * 60 * 60 * 24 * 7 // Weeks
		case "M":
			return value * 60 * 60 * 24 * 30 // Months
		case "y":
			return value * 60 * 60 * 24 * 365 // Years
		default:
			return value // Assume seconds
	}
}

/**
 * Converts true/false to a boolean, or null.
 * @param value The value to convert.
 * @returns The boolean value, or null.
 */
export const parseBoolean = (value?: string | null): boolean | null => {
	if (value === "true") return true
	if (value === "false") return false

	return null
}

/**
 * Maps the query parameters from a URL.
 * @param searchParams The URL's query parameters.
 * @returns The parsed query parameters.
 */
export const parseQueryParameters = (searchParams: URLSearchParams): QueryParameters => ({
	minimumVersion: searchParams.get("min"),
	maximumVersion: searchParams.get("max"),
	matchVersion: searchParams.get("match"),
	forVersion: searchParams.get("for"),

	minimumAge: parseDuration(searchParams.get("age")),

	isStable: parseBoolean(searchParams.get("stable")),
	isLongTermSupport: parseBoolean(searchParams.get("lts")),
	isEndOfLife: parseBoolean(searchParams.get("eol"))
})
