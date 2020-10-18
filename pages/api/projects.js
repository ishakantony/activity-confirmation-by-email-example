import { projects } from '../../db/projects'

export default async (req, res) => {
  res.statusCode = 200
  res.json(projects)
  return
}
