"use client";
import CallBackComponent from "@/components/callback-component";
import React, { Suspense } from "react";

const CallBackPage = () => {
  return (
    <Suspense>
      <CallBackComponent />
    </Suspense>
  );
};

export default CallBackPage;
