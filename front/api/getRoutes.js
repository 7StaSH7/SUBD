export const getRoutes = async () => {
  const res = await fetch("http://localhost:5000/api/routes");
  const data = await res.json();
  return data.result;
};
