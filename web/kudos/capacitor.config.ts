import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.superapp-kudos",
  appName: "kudos",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
