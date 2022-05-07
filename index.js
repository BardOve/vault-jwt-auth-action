const core = require('@actions/core')
const github = require('@actions/github')
const https = require('https')

async function jwt() {
    try {
        // Fetching github token
        const jwt = await core.getIDToken();
        core.setOutput("jwt", jwt);
      
      
        // Get the JSON webhook payload for workflow.
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    } catch (error) {
        core.setFailed(error.message);
      }    
}
    
jwt();


async function httpsreq() {
const vaultaddr = core.getInput('vaultaddr')
const options = {
    hostname: vaultaddr,
    port: 443,
    method: 'GET'
};

await jwt();

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`source: ${res.headers}`)
    
    res.on('data', d => {
        process.stdout.write(d);
    });
    });

req.on('error', error => {
console.error(error);
});

req.end();
}

httpsreq();