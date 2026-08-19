import BambooLoader from "@components/BambooLoader";

export default function Loading({ params }) {
  const locale = params?.locale;
  const label = locale === "en" ? "Loading…" : "Chargement…";

  return <BambooLoader label={label} />;
}