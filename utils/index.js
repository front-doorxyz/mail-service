module.exports = {
  randomSixNumber: () => {
    return Math.floor(100000 + Math.random() * 900000)
  },
  streamToString: (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
  },
  errorCodes: {
    NO_AUTH_HEADER: 'No authorization header provided!',
    NO_ADDRESS_FROM_SIG: 'No address could be linked to the signature!',
    NO_ADDRESS_PROVIDED: 'No address provided!',
    NO_VERIFICATION_CODE: 'No verification code provided!',
    NO_VERIFICATION_CODE_MATCH: 'Verification code does not match!',
    NO_EMAIL: 'No email provided!',
    EMAIL_FAILURE: 'error sending email!',
    VERIFICATION_CODE_SAVE_FAILURE: 'Error saving verification code!',
    NO_IPFS_PATH: 'No IPFS path provided!'
  }
}