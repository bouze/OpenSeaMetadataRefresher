import fs from 'fs';
import dotenv from 'dotenv';
import opensea from '@api/opensea';
dotenv.config();

const API_KEY = process.env.API_KEY;
const INTERVAL_SEC = parseFloat(process.env.INTERVAL_SEC);

const collections = JSON.parse(fs.readFileSync('refresher.config.json', 'utf8'));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

opensea.auth(API_KEY);
opensea.server('https://api.opensea.io');

(async () => {
    for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        const minId = collection.MIN_ID;
        const maxId = collection.MAX_ID;
        console.log("#########################################");
        console.log(collection.NAME);

        for (let j = minId; j <= maxId; j++) {
            try {
                const result = await opensea.refresh_nft({
                    chain: 'ethereum',
                    address: collection.ADDRESS,
                    identifier: String(j)
                });
                console.log(`- token_id #${j}`);
                console.log(`  - result: ${result.data}`);
            } catch (err) {
                console.error(j, "error", err);
            } finally {
                await sleep(INTERVAL_SEC * 1000);
            }
        }
    }
    console.log("#########################################");
    console.log("ALL DONE.");
    console.log("#########################################");
})();
