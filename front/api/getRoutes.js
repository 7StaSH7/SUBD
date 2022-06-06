export const getRoutes = async (filter) => {
  const res = await fetch(`http://localhost:5000/api/routes?filter=${filter}`);
  const data = await res.json();
  return data.result;
};
