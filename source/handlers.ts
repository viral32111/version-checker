import PHPHandler from "./software/php"
import { SoftwareHandlers } from "./types"

/**
 * Map of software names to their handler functions.
 */
export const softwareHandlers: SoftwareHandlers = new Map([
	["alpine", null],
	["ubuntu", null],

	["httpd", null],

	["php", PHPHandler],
	["composer", null],

	["node", null],
	["npm", null],
	["yarn", null]
])
