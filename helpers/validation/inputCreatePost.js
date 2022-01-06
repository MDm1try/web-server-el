import { POST_PURPOSES, POST_TYPES, POST_TYPE_MAP } from '../../constants';

function inputCreatePost(data) {
  const errors = {};

  if (data.type === POST_TYPE_MAP.LAND_RENT && !data.costPer) {
    errors.costPer = 'costPer is required';
  }
  if (data.type === POST_TYPE_MAP.LAND_SALE && data.costPer) {
    errors.costPer = 'costPer should be null';
  }
  if (!data.name) {
    errors.name = 'name is required';
  }
  if (!data.cadNum) {
    errors.cadNum = 'cadNum is required';
  }
  if (!data.areaHectares) {
    errors.areaHectares = 'areaHectares is required';
  }
  if (!POST_TYPES.includes(data.type)) {
    errors.type = 'type is required';
  }
  if (!POST_PURPOSES.includes(data.purpose)) {
    errors.purpose = 'purpose is required';
  }
  if (!data.cost) {
    errors.cost = 'cost is required';
  }
  if (!data.currency) {
    errors.currency = 'currency is required';
  }
  if (!data.description) {
    errors.description = 'description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export default inputCreatePost;
