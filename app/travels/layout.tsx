import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travels",
  description:
    "Travel journal by John Mathews, places visited and experiences.",
};

export default function TravelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
