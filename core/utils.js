export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  if (!password) return "Password cannot be empty.";
  else if (password.length < 6)
    return "Password must be at least 6 characters long.";
  else
  return "";
};

export const usernameValidator = (name) => {
  if (!name || name.length <= 0) return "Username cannot be empty.";

  return "";
};

export const phoneNumberValidator = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length <= 0)
    return "Phone Number cannot be empty.";
  else if (phoneNumber.length > 12)
    return "Phone Number cannot be more than 12 digits.";
  else
    return "";
};
