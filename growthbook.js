const { GrowthBook } = require('@growthbook/growthbook');

const gb = new GrowthBook({
  clientKey: process.env.GROWTHBOOK_KEY || 'growthbook_KEY',
  apiHost: 'https://cdn.growthbook.io',
});

gb.init();

module.exports = gb;