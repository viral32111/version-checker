import { SoftwareHandler } from "../types"

// TODO: Implement this handler

const PHPHandler: SoftwareHandler = async parameters => {
	console.dir(parameters)

	await fetch("https://example.com")

	return []
}

export default PHPHandler
