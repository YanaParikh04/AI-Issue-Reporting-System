import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ReportIssue } from "./pages/ReportIssue";
import { Success } from "./pages/Success";
import { TrackStatus } from "./pages/TrackStatus";
import { AdminDashboard } from "./pages/AdminDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "report", Component: ReportIssue },
      { path: "success", Component: Success },
      { path: "track", Component: TrackStatus },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
