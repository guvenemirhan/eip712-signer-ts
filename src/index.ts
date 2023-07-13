import express, { Express, Request } from 'express';
import dotenv from 'dotenv';
import {signPresaleData} from './utils/signData';
import {Presale} from "./constants";

interface Requests {
    presale: Presale,
    owner: string
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.post('/sign', async (req: Request<any, any, Requests>, res) => {
    const signature: string = await signPresaleData(req.body.presale, req.body.owner);
    if (!signature.includes('0x')) {
        res.status(400).json({ error: signature });
    } else {
        res.status(200).send(signature);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
