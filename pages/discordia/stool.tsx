import SOC from "../../src/components/SOC";
import { useUpdateTitle } from "../../src/hooks/titleContext";

export default function StoolPage() {
  useUpdateTitle("Stool of Contents");
  return <SOC />;
}
