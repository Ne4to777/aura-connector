const {
	identity,
	checkFile,
	readFile,
	writeFile,
	question,
	encode,
	close,
	robocopy
} = require('./utility.js')

const defaults = require('./defaults.json')

const createAuthFile = async path => {
	const err = await checkFile(path).catch(identity)
	if (err) {
		const data = {
			siteRelativePath: await question('Application Relative Path'),
			siteDisk: `${await question('Site WebDAV Disc Label')}://`,
			deployPath: await question('Deploy Path'),
			username: await question('Username'),
			password: encode(await question('Password'))
		}
		await writeFile(path, JSON.stringify(Object.assign({}, defaults, data)))
	}
	close()
}

const updatePassword = async path => {
	const data = await readFile(path)
	const password = encode(await question('Password'))
	const newData = data.replace(/"password":\s".+"/, `"password": "${password}"`)
	await writeFile(path, newData)
	close()
}

const deploy = path => robocopy({
	source: './dist',
	destination: path,
	files: ['*.*'],
	file: { excludeFiles: ['*.html'] },
	copy: { subdirs: true }
})

module.exports = {
	createAuthFile,
	updatePassword,
	deploy
}