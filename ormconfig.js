module.exports = {
	type: 'mysql',
	host: 'vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	port: 3306,
	username: 'a2eydimj622ok01u',
	password: 'u74245loq15zux5y',
	database: 'qpsg4c91khm0hauv',
	entities: ['dist/databases/entity/*.js'],
	migrations: ['dist/databases/migration/*.js'],
	cli: {
		migrationsDir: 'src/databases/migration',
	},
}
