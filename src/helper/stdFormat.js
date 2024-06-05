const standardFormat = (status, data, message) => {
  return {
    status,
    message: message || 'DEFAULT_MESSAGE_FOR_' + status,
    data,
  }
}

export default standardFormat
