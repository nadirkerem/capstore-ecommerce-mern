import { Outlet, useNavigation } from "react-router-dom";

import { Header, LoadingSpinner } from "../components";

export default function HomePage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      {isLoading ? <LoadingSpinner /> : <Outlet />}
    </>
  );
}
