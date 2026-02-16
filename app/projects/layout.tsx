import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of software projects by John Mathews, spanning embedded systems, web development, and more.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
