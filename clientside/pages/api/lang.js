// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import language from '../../languages/lang.json'
export default function handler(req, res) {
    res.status(200).json(language)
}
