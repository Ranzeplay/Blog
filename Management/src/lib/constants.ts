export const MGMT_REQ_HEADER = {
  "Content-Type": "application/json",
  "Authorization": process.env.MGMT_ACCESS_TOKEN as string,
};

export const FRONTEND_REQ_HEADER = {
  "Content-Type": "application/json",
  "Authorization": process.env.FRONTEND_ACCESS_TOKEN as string,
};
