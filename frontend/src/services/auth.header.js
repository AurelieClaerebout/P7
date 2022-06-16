export const authHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user && user.token) {
    return { headers: { Authorization: "Bearer " + user.token } };
  } else {
    return {};
  }
};
