export const dynamic = "force-dynamic";

function ContactPage() {
  return (
    <div className="px-4 lg:px-12 py-8">
      <div className="bg-white rounded-md shadow p-6 border">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Have questions or want to get in touch? Feel free to reach out via
          email!
        </p>
        <a
          href="mailto:bhupeshvyas202@gmail.com"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          bhupeshvyas202@gmail.com
        </a>
      </div>
    </div>
  );
}

export default ContactPage;
