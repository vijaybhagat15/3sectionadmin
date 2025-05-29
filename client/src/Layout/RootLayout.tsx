import { Outlet } from "react-router-dom";

export default function RootLayout() {

  return (
    <section className="w-full h-screen flex">
      <Outlet />
    </section>
  );
}
