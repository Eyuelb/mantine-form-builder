const envConfig = {
  databaseUrl:process.env.NEXT_PUBLIC_DATABASE_URL || "",
};

if (!envConfig.databaseUrl) throw new Error("Database Url not found.");

export default envConfig;
