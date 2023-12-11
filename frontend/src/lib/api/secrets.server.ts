import 'dotenv/config'

const secrets: Secrets = {
    apiUrl: process.env.API_URL,
    token: process.env.API_TOKEN
};

export default secrets