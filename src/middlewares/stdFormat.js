import standardFormat from '../helper/stdFormat'
import { getName } from '../helper/statuscode'

export default (req, res, next) => {
  res.stdFormat = (status, data, message) => {
    res
      .status(status)
      .json(standardFormat(status, data, message || getName(status)))
  }
  next()
}
