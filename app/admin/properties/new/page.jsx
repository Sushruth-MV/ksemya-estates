import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Add New Property</h1>
      <p className="text-cream/50 mb-8">
        Fill in the details below. You can toggle &quot;Featured&quot; to show it in the homepage
        carousel.
      </p>
      <PropertyForm />
    </div>
  );
}
