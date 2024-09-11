import { DataSource } from 'typeorm'
import enVariables from '../../config/index.js'

const shutDown = () => {
  dataSource.destroy()
}

const config = enVariables

const dataSource = new DataSource({
  type: config.dialect || 'mysql',
  host: config.host,
  port: config.port || 3306,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: false,
  logging: config.logging,
  entities: ['src/models/entity/**/*{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  migrationsTableName: 'typeorm_migration',
})

dataSource.initialize().then(() => console.log('connected to DB succesfully!'))

export { dataSource, shutDown }
