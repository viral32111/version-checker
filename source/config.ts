/**
 * The names of the supported software.
 */
export const SOFTWARE_NAMES = ["alpine", "ubuntu", "httpd", "php", "composer", "node", "npm", "yarn"] as const

/**
 * The default HTTP response headers.
 */
export const DEFAULT_RESPONSE_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Credentials": "true",

	"Cache-Control": "public, max-age=300",

	"X-Robots-Tag": "noindex, nofollow",

	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "deny",

	"X-Source-Url": "https://github.com/viral32111/version-checker",
	"X-Contact-Name": "viral32111",
	"X-Contact-Email": "contact@viral32111",
	"X-Contact-Url": "https://viral32111.com"
}
