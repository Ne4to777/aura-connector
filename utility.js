
const fs = require('fs')
const { Cpass } = require('cpass')
const readline = require('readline')
const robocopy = require('robocopy')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const identity = x => x
const question = msg => new Promise(
	resolve => rl.question(`${msg}: `, resolve)
)
const close = () => rl.close()
const checkFile = path => new Promise(
	(resolve, reject) => fs.stat(path, err => err ? reject(err) : resolve())
)
const readFile = source => new Promise(
	(resolve, reject) => fs.readFile(source, 'utf8', (err, data) => err ? reject(err) : resolve(data))
)
const writeFile = (path, payload) => new Promise(
	(resolve, reject) => fs.writeFile(path, payload, 'utf8', (err, data) => err ? reject(err) : resolve(data))
)

const encode = data => new Cpass().encode(data)

module.exports = {
	identity,
	question,
	checkFile,
	readFile,
	writeFile,
	encode,
	close,
	robocopy
}
