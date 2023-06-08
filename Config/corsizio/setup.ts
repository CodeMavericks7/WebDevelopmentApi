import axios from 'axios';
import * as dotenv from 'dotenv'
dotenv.config()

const rootUrl = 'https://api.corsizio.com/v1';
const apiKey = process.env.corsizioApiKey;

export function corsizio(url: string) {
    axios({
        method: 'get',
        url: rootUrl + url,
        headers: {
            'Authorization': apiKey
        }
    })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

// async function test(){
//     const res = await corsizio(`/events/6451d0a7623616c2e73a9ad8?include=attendees`);
// }

// test();
