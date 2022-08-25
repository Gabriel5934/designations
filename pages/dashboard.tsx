import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { auth } from "../firebase";

const Dashboard: NextPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   !auth.currentUser && router.push("/");
  // });

  return true ? <div>Dashboard</div> : <div>Loading...</div>;
};

export default Dashboard;
