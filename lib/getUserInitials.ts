export const getInitials = (fullName: string) => {
  const nameParts = fullName.trim().split(" ");

  const firstName = nameParts[0];
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;

  if (lastName) {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  } else {
    return firstName.substring(0, 2).toUpperCase();
  }
};
