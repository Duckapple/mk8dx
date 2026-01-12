import { MAPS } from '$lib/data';

function loadCSV<T extends Record<string, string | number>>(data: string) {
	const [header, ...rows] = data
		.trim()
		.split('\n')
		.map((row) => row.split(','));

	const res = rows.map((row) => {
		const obj: Record<string, string | number> = {};
		for (let index = 0; index < header.length; index++) {
			const key = header[index];
			const value = row[index];
			const numValue = parseFloat(value);
			obj[key] = isNaN(numValue) ? value : numValue;
		}
		return obj;
	});
	return res as T[];
}

export function load() {
	const maps = loadCSV<Record<'name' | 'cup' | 'tn', string>>(MAPS);
	const cups = maps.reduce((set, val) => {
		set.add(val.cup as string);
		return set;
	}, new Set<string>());
	return {
		maps,
		cups,
	};
}

export const prerender = true;
