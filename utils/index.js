const { morning, evening } = require("./module1");
const { night, day } = require("./module2");

morning("index at DC");
night("index at Oakland");

module.exports = { morning, evening, night, day };
