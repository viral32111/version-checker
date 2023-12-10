import { SOFTWARE_NAMES } from "./config"

/**
 * The names of the supported software.
 */
export type Software = (typeof SOFTWARE_NAMES)[number]

/**
 * Map of software names to their handler functions.
 */
export type SoftwareHandlers = Map<Software, SoftwareHandler | null>

/**
 * A software's handler function.
 */
export type SoftwareHandler = (parameters: QueryParameters) => Promise<SoftwareVersion[]>

/**
 * The query parameters after parsing, for passing to a software's handler.
 * We use null instead of undefined so they are included in the JSON response.
 */
export interface QueryParameters {
	minimumVersion: string | null
	maximumVersion: string | null
	matchVersion: string | null
	forVersion: string | null
	minimumAge: number | null // Seconds
	isStable: boolean | null
	isLongTermSupport: boolean | null
	isEndOfLife: boolean | null
}

/**
 * The response structure when successful.
 */
export interface SuccessResponse {
	software: Software
	parameters: QueryParameters
	versions: SoftwareVersion[]
}

/**
 * The response structure when unsuccessful.
 */
export interface ErrorResponse {
	code: number
	reason: string
}

/**
 * A software's version.
 */
export interface SoftwareVersion {
	version: string

	isStable: boolean
	isLongTerm: boolean
	isEndOfLife: boolean

	downloads: Record<string, SoftwareDownload>
}

/**
 * Download of a software's version.
 */
export interface SoftwareDownload {
	fileUrl: string
	signatureUrl?: string
	checksums: Record<string, string>
}
