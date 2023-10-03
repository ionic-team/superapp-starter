import { registerPlugin } from "@capacitor/core/";
import { getInitialContext } from "@ionic/portals";

interface DismissPlugin {
  dismiss(): Promise<void>;
}

type Context = {
  auth0: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
  resourceId: number;
};

export const dismissPlugin = registerPlugin<DismissPlugin>("Dismiss", {});
export const initialContext = getInitialContext<Context>()?.value || {};
