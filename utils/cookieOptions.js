const cookieOptions = {
  httpOnly: true,
  maxAge: 15 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
  secure: process.env.NODE_ENV === "Development" ? false : true,
};

export default cookieOptions;