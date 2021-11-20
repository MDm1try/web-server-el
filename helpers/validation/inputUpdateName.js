function inputUpdateName(data) {
  let error = '';

  if (!data.lastName || !data.lastName.trim()) {
    error = 'Last Name is required';
  } else if (typeof data.lastName !== 'string') {
    error = 'Last Name is invalid';
  }

  if (!data.firstName || !data.firstName.trim()) {
    error = 'First Name is required';
  } else if (typeof data.firstName !== 'string') {
    error = 'First Name is invalid';
  }

  return {
    isValid: error.length === 0,
    error,
  };
}

export default inputUpdateName;
