2015	20	22: 45	21	16: 38	23	08: 20	22	04: 48
2016	20	04: 31	20	22: 35	22	14: 21	21	10: 45

https://astronomy.stackexchange.com/questions/28058/why-is-the-time-between-equinoxes-different
https://de.wikipedia.org/wiki/Apsis_(Astronomie)

let dates = [
	new Date(2015, 2, 20, 22, 45),
	new Date(2015, 5, 21, 16, 38),
	new Date(2015, 8, 23, 8, 20),
	new Date(2015, 11, 22, 4, 48),
	new Date(2016, 2, 20, 4, 31),
	new Date(2016, 5, 20, 22, 35),
	new Date(2016, 8, 22, 14, 21),
	new Date(2016, 11, 21, 10, 45),
]

for (let i = 1; i < dates.length; i++) {
	console.log(i, dates[i] - dates[i - 1], (dates[i] - dates[i - 1]) / 1000 / 60 / 60 / 24)
}