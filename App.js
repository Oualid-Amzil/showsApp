import { Provider } from "react-redux";

import MainNavigator from "./navigation/MainNavigation";
import { useFonts } from "expo-font";

import store from "./store";

export default function App() {
  const [loaded] = useFonts({
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    "ptserif-bold": require("./assets/fonts/PTSerif-Bold.ttf"),
    "abissinicaSIL-regular": require("./assets/fonts/AbyssinicaSIL-Regular.ttf"),
    "arabic-font": require("./assets/fonts/NotoNaskhArabic-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
