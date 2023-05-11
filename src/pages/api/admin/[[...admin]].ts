// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        //Get incoming request params
        const requestUrl = req.url?.substring("/api/admin".length)

        //Build CRUD request
        if (!process.env.SERVER_URL) throw new Error("SERVER_URL missing")
        const url = `${process.env.SERVER_URL}/api${requestUrl}`

        const Authorization = req.headers.authorization ?? ""
        //Header-options
        const options: RequestInit = {
            method: req.method,
            headers: {
                prefer: req.headers['prefer']?.toString() ?? "",
                accpet: req.headers['accept'] ?? "",
                Authorization: JSON.stringify(`Bearer ${Authorization}`),
            },
        }

        if (req.body) {
            options.body = JSON.stringify(req.body)
        }

        const response = await fetch(url, options)
        console.log("🚀 ~ file: [[...admin]].ts:36 ~ url:", url)

        res.status(response.status)
        res.setHeader("Content-Range", response.headers.get("content-range") || "")
        res.end(await response.text())
    } catch (error) {
        console.log(error)
    }
}
