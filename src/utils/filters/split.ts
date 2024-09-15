export const split = (str: string, param?: string): string => {
	if (!param) {
		console.error('Split filter requires a separator parameter');
		return JSON.stringify([str]);
	}

	// Remove quotes from the param if present
	param = param.replace(/^["']|["']$/g, '');

	let separator: string | RegExp;
	if (param.startsWith('/') && param.endsWith('/')) {
		// It's a regex
		try {
			separator = new RegExp(param.slice(1, -1));
		} catch (error) {
			console.error(`Invalid regex in split filter: ${param}`, error);
			return JSON.stringify([str]);
		}
	} else {
		// It's a string
		separator = param;
	}

	// Split operation
	const result = str.split(separator);

	return JSON.stringify(result);
};