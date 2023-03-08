import fs from 'fs'
import { resolve } from 'path'
const dbPath = resolve(__dirname, './db.json')
const install = () => {
  const flag = fs.existsSync(dbPath)
  if (!flag) {
    fs.writeFileSync(dbPath, '')
  }
  return true
}

export default {
  dbPath,
  install
}
