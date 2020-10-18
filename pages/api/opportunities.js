import { opportunities } from '../../db/opportunities'

export default async (req, res) => {
  res.statusCode = 200
  res.json(opportunities)
  return
}
