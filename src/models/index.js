import dataSource from '#models/dataSource.js'

const Connect = async () => {
  try {
    await dataSource.initialize()
    console.log('connected to DB succesfully!')
  } catch (error) {
    console.error('Error during Data Source initialization:', error)
  }
}

const Close = async () => {
  try {
    console.log('close db connection')
    await dataSource.destroy()
  } catch (error) {
    console.error(error)
  }
}

export { dataSource, Connect, Close }
