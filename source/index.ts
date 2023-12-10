// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Env {}

export default {
	// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
	async fetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
		const requestUrl = new URL(request.url)
		const requestPath = requestUrl.pathname.slice(1)
		const requestParameters = Object.fromEntries(requestUrl.searchParams)

		if (!requestPath)
			return new Response(null, {
				status: 307,
				headers: {
					Location: "https://github.com/viral32111/version-checker"
				}
			})

		return new Response(
			JSON.stringify({
				software: requestPath,
				parameters: requestParameters,
				versions: []
			}),
			{
				status: 501,
				headers: {
					"Content-Type": "application/json; charset=utf-8",

					"Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",

					"X-Robots-Tag": "noindex, nofollow",

					"X-Content-Type-Options": "nosniff",
					"X-Frame-Options": "deny",

					"X-Source-Url": "https://github.com/viral32111/version-checker",
					"X-Contact-Name": "viral32111",
					"X-Contact-Email": "contact@viral32111",
					"X-Contact-Url": "https://viral32111.com"
				}
			}
		)
	}
}
