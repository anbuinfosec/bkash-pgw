import FormComponent from "@/components/form-component";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Home | Mohammad Alamin",
  description: "Bkash pgw integration with Next.js",
  keywords: "Next.js, Bkash, payment gateway, integration, web development"
};
export default function Home() {
  return (
    <Suspense>
      <FormComponent />
    </Suspense>
  );
}
