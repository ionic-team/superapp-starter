import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.superapp-expenses",
  appName: "expenses",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
