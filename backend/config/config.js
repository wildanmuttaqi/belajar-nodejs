module.exports = {
  development: {
    username: "root",
    password: "covid19#",
    database: "db_covid19",
    host: "mysql",
    dialect: 'mysql',
    key: 'covid19#12',
    use_env_variable: 'DATABASE_URL'
  },
  production: {
    username: "ybmbzgwfnwfuil",
    password: "55f6a55e23427f00edad319b41cbf0a07e4f0976d236157418679a39a499f5d5",
    port: "5432",
    database: "df5dgkg32at582",
    host: "ec2-52-203-74-38.compute-1.amazonaws.com",
    dialect: 'postgres',
    dialectOptions: {
      ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false
      }
    },
    key: 'covid19#12',
    use_env_variable: 'DATABASE_URL'
  }
};
