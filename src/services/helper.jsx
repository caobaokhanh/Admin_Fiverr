export const formValidate = {
  required: {
    required: true,
    message: "This field cannot be blank",
  },

  email: {
    type: "email",
    message: "Invalid email",
  },
  phoneNumber: {
    pattern: /^[0-9]{10}$/,
    message: "Invalid phone number",
  },
};
