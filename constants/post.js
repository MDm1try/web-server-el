const POST_STATUS_MAP = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCK: 'block',
  TRASH: 'trash',
};
const POST_STATUSES = Object.values(POST_STATUS_MAP);
const POST_CURRENCIES = ['USD', 'EUR', 'UAH'];

const COST_PER_MAP = {
  PER_YEAR: `per-year`,
  PER_MONTH: `per-month`,
};
const COST_PER_VALUES = Object.values(COST_PER_MAP);

const POST_TYPE_MAP = {
  LAND_RENT: 0,
  LAND_SALE: 1,
};
const POST_TYPES = Object.values(POST_TYPE_MAP);
const POST_PURPOSE_MAP = {
  AGRICULTURAL_LAND: 0,
  LAND_FOR_HOUSING_AND_PUBLIC_BUILDINGS: 1,
  WELLNESS_LAND: 2,
  LAND_FOR_RECREATIONAL_PURPOSES: 3,
  FORESTRY_LANDS: 4,
  WATER_FUND_LAND: 5,
  LAND_FOR_INDUSTRY_TRANSPORT_AND_OTHER_PURPOSES: 6,
  LAND_STOCK_RESERVE_FUND_AND_COMMON_USE: 7,
};
const POST_PURPOSES = Object.values(POST_PURPOSE_MAP);

const POST_SORTING = {
  cost: {
    asc: ['cost', 'ASC'],
    desc: ['cost', 'DESC'],
  },
  name: {
    asc: ['name', 'ASC'],
    desc: ['name', 'DESC'],
  },
  areaHectares: {
    asc: ['areaHectares', 'ASC'],
    desc: ['areaHectares', 'DESC'],
  },
};

module.exports = {
  POST_STATUS_MAP,
  POST_STATUSES,
  POST_CURRENCIES,
  POST_TYPE_MAP,
  POST_TYPES,
  POST_PURPOSE_MAP,
  POST_PURPOSES,
  POST_SORTING,
  COST_PER_VALUES,
  COST_PER_MAP,
};
