import appConfig from "@/config/app-config";

export default function HomePage() {
  // For now, hardcode locale to 'vi'. This can be made dynamic later.
  const currentLocale = "vi";
  const homeSection = appConfig[currentLocale].sections.find(
    (section) => section.id === "home"
  );

  if (!homeSection) {
    return <div>Home section not found.</div>;
  }

  return <>{homeSection.component}</>;
}
