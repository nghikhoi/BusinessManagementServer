const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
  .option('init', {
    alias: 'i',
    type: 'boolean',
    default: false
  })
  .help()
  .parse()

module.exports = {
    init: argv.init
};
