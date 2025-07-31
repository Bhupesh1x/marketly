export const dynamic = "force-dynamic";

function PricingPage() {
  return (
    <div className="px-4 lg:px-12 py-8">
      <div className="bg-white rounded-md shadow p-6 border">
        <h1 className="text-3xl font-semibold mb-6">Pricing</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Marketly is <strong>completely free</strong> to use as this is a
          personal side project built with learning and experimentation in mind.
        </p>

        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="font-semibold text-lg">Free Plan</h2>
            <p>
              Access to all core features with no cost perfect for testing and
              learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
