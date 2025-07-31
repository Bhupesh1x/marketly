export const dynamic = "force-dynamic";

function AboutPage() {
  return (
    <div className="px-4 lg:px-12 py-8">
      <div className="bg-white rounded-md shadow p-6 border">
        <h1 className="text-3xl font-semibold mb-6">About Marketly</h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Marketly is a fully-featured, multi-tenant digital marketplace
          designed for creators and entrepreneurs to sell their digital products
          effortlessly.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          With a focus on flexibility, Marketly combines powerful tools like
          Next.js, Payload CMS, and Stripe Connect to deliver a seamless
          experience for both merchants and customers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you&apos;re a developer or a seller wanting to launch your
          digital storefront, Marketly offers a solid foundation with modern
          best practices.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
