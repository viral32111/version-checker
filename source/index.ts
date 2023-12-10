import { softwareHandlers } from "./handlers"
import { errorResponse, isSoftware, parseQueryParameters, successResponse } from "./helpers"

const handleRequest = async (request: Request): Promise<Response> => {
	// Parse the request
	const requestUrl = new URL(request.url)
	const requestPath = requestUrl.pathname.slice(1)
	const requestParameters = parseQueryParameters(requestUrl.searchParams)

	// Redirect to GitHub repo if no software is given
	if (!requestPath)
		return new Response(null, {
			status: 307,
			headers: {
				Location: "https://github.com/viral32111/version-checker"
			}
		})

	// Is the software supported?
	if (isSoftware(requestPath)) {
		// Ensure the handler exists
		const softwareHandler = softwareHandlers.get(requestPath)
		if (softwareHandler === undefined) return errorResponse({ code: 1, reason: "Software is not supported" }, 400)
		if (softwareHandler === null) return errorResponse({ code: 2, reason: "Software is not implemented yet" }, 501)

		// Execute the handler
		const handlerResponse = await softwareHandler(requestParameters)

		// Return the response
		return successResponse({
			software: requestPath,
			parameters: requestParameters,
			versions: handlerResponse
		})
	}

	return errorResponse({ code: 1, reason: "Software is not supported" }, 400)
}

export default {
	fetch: handleRequest
}
