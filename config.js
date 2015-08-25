var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    name: 'HGardens',
    ip: '0.0.0.0',
    port: 3000,
    data_dir: './data/'
  },
  production: {
    name: 'HGardens',
    ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    data_dir: process.env.OPENSHIFT_DATA_DIR || './data/'
  }
}

module.exports = config[env];
