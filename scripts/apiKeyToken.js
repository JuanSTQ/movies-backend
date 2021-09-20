/* DEBUG=app:* node scripts/users.js */
const crypto = require('crypto')
const debug = require('debug')('app:scripts:api-key');
const chalk = require('chalk');
const ApiKeyToken = require('../services/apiKeyTokens');
const apiKeyTokenService = new ApiKeyToken()
const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'create:movies',
  'update:movies',
  'delete:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies'
];
const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies'
];

const generateRandomToken = ()=>{
  const buffer =crypto.randomBytes(32)
  return buffer.toString('hex');
}
const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
];

async function seedApiKeys(apiKeys){
  try {
    const promises = await Promise.all(apiKeys.map(async apiKeyToken=>{
      const id = await apiKeyTokenService.createApiKeyToken({apiKeyToken})
      return id
    }))
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }

}

seedApiKeys(apiKeys)