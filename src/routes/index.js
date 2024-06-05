import users from './users'

export default (app) => {
  app.use('/users', users),
    app.all('*', (req, res) =>
      res.status(200).send({
        message: 'Hello World!',
      })
    )
}
