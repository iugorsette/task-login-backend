import { MongoHelper } from 'src/infra'
import app from './app'
import { env } from 'src/domain'

MongoHelper.connect(`mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}`, env.DB_NAME)
  .then(() => {
    app.listen(env.APP_PORT, () => {
      console.log(`Executando o ambiente ${env.APP_ENV}, porta: ${env.APP_PORT}`)
    })
  })
  .catch(err => { console.log(`Ocorreu um erro na conexão ${err.message}`) })
