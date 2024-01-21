import { useParams } from "react-router-dom";
import EventLogCard from "../components/event-log-card";

export default function FeedPage() {
  const { projectId = "" } = useParams();
  return (
    <div className="flex flex-col items-center gap-5">
      <EventLogCard
        event={{
          id: 101,
          name: "Successful payment",
          description:
            "2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping",
          createdAt: "Today at 11:03 pm",
          icon: "✅",
        }}
        channel={{
          id: "101",
          name: "product-payments",
        }}
        projectId={projectId}
      />
      <EventLogCard
        event={{
          id: 101,
          name: "Successful payment",
          description:
            "2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping",
          createdAt: "Today at 11:03 pm",
          icon: "✅",
        }}
        channel={{
          id: "101",
          name: "product-payments",
        }}
        projectId={projectId}
      />
      <EventLogCard
        event={{
          id: 101,
          name: "Successful payment",
          description:
            "2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping 2x 1TB SSD - Overnight Shipping",
          createdAt: "Today at 11:03 pm",
          icon: "✅",
        }}
        channel={{
          id: "101",
          name: "product-payments",
        }}
        projectId={projectId}
      />
    </div>
  );
}
