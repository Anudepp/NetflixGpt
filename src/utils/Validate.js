const checkValidData = (email, password) => {
  const isEmailvalid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );

  if (!isEmailvalid) {
    return "Please enter a valid email address.";
  }
  if (!isPasswordvalid) {
    return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
  }

  return null;
};

export default checkValidData;
