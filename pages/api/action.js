import dayjs from 'dayjs'
import { opportunities } from '../../db/opportunities'
import { projects } from '../../db/projects'
import { decrypt } from '../../src/utils/crypto'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.json({ message: 'Method Not Allowed' })
    return
  }

  const { hash } = req.body

  const decryptedString = decrypt({
    iv: hash.split('.')[0],
    content: hash.split('.')[1],
  })

  const { id, title, ts } = JSON.parse(decryptedString)

  const actionDate = dayjs(ts)

  if (dayjs().diff(actionDate, 'second') > 30) {
    res.statusCode = 400
    res.json({ message: 'Link expired.' })
    return
  }

  const opportunityIndexToRemove = opportunities.findIndex((o) => o.id === id)

  if (opportunityIndexToRemove !== -1) {
    opportunities.splice(opportunityIndexToRemove, 1)

    projects.push({ id, title })

    res.statusCode = 200
    res.json({ message: `Successfully Convert "${title}" to Project!` })
  } else {
    res.statusCode = 400
    res.json({ message: `Opportunity not found or already been converted` })
  }
}
