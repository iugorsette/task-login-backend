import { MongoHelper } from 'src/infra'
import app from './app'

MongoHelper.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, process.env.DB_NAME)
  .then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log(`Executando o ambiente ${process.env.APP_ENV}, porta: ${process.env.APP_PORT}`)
    })
  })
  .catch(err => { console.log(`Ocorreu um erro na conexão ${err.message}`) })
