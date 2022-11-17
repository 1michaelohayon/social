import { Sequelize } from 'sequelize'
import config from "./config"
import { Umzug, SequelizeStorage } from 'umzug'

export const sequelize: Sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})


const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
}
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations()
    console.log('connected to the database');
  } catch (err) {
    console.log(err)
    console.log('failed to connect to the database');
    return process.exit(1);
  };

  return null
};

export const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

