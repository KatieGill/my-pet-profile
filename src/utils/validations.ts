export const arePasswordsValid = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

export const isPasswordValid = (password: string) => {
  return password.length > 4;
};

export const isUsernameValid = (username: string) => {
  return username.length > 1;
};

export const isInputValid = (input: string) => {
  return input.length > 0;
};
export const isPetNameValid = (petName: string) => {
  return petName.length > 0;
};

export const isImageSelected = (image: string) => {
  return image !== "";
};

export const isDobValid = (dob: Date) => {
  return dob !== ("" as unknown as Date);
};

export const isNoteValid = (note: string) => {
  return note.length > 0;
};
