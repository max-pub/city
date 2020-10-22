let data = Deno.readTextFileSync('./cities.tsv');

let save = {};
for (let line of data.split('\n').slice(1)) {
	let [a, city, lat, lon, country, iso2, iso3, state, b, pop, c] = line.split('\t').map(x => x.trim());
	// console.log('data', line);
	if (!save[country]) save[country] = {};
	if (!save[country][state]) save[country][state] = {};
	// save[country][state][city] = { lat: lat * 1, lon: lon * 1, pop: Math.round(pop / 1000) }
	save[country][state][city] = [lat * 1, lon * 1, Math.round(pop / 1000)]
}

Deno.writeTextFileSync('dist/cities.min.js', 'export default ' + JSON.stringify(save))
Deno.writeTextFileSync('dist/cities.js', 'export default ' + JSON.stringify(save, null, '\t'))