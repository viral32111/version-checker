// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Env {}

export default {
	// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
	async fetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
		return new Response(JSON.stringify([]), {
			status: 501,
			headers: {
				"X-Robots-Tag": "noindex, nofollow",

				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "deny",

				"X-Source-Url": "https://github.com/viral32111/version-checker-worker",
				"X-Contact-Name": "viral32111",
				"X-Contact-Email": "contact@viral32111",
				"X-Contact-Url": "https://viral32111.com"
			}
		})
	}
}
