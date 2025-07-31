export const dynamic = "force-dynamic";

function FeaturesPage() {
  return (
    <div className="px-4 lg:px-12 py-8">
      <div className="bg-white rounded-md shadow p-6 border">
        <h1 className="text-3xl font-semibold mb-6">Platform Features</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Marketly is a practical, fully-featured marketplace built with modern
          technologies including Next.js 15, Payload CMS, and Stripe Connect.
          It’s designed as a learning project covering all essentials needed to
          build and run a scalable digital commerce platform.
        </p>

        <h2 className="text-xl font-semibold mb-4">Key Features:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Multi-tenant architecture</li>
          <li>Custom merchant storefronts</li>
          <li>Stripe Connect integration</li>
          <li>Automatic platform fees</li>
          <li>Product ratings & reviews</li>
          <li>User purchase library</li>
          <li>Role-based access control</li>
          <li>Admin dashboard</li>
          <li>Merchant dashboard</li>
          <li>Payload CMS backend</li>
          <li>Category & product filtering</li>
          <li>Search functionality</li>
          <li>Image upload support</li>
          <li>Built with Next.js 15</li>
          <li>TailwindCSS V4 styling</li>
          <li>ShadcnUI components</li>
        </ul>
      </div>
    </div>
  );
}

export default FeaturesPage;
