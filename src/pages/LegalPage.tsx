import { PageHeader } from '../components/PageHeader'

const contentMap = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "Last updated: October 2026. Learn how we collect, use, and protect your data.",
    body: (
      <>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">2. Use of Information</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          We may use the information we collect about you to: Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">3. Sharing of Information</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: With third parties to provide you a service you requested through a partnership or promotional offering made by a third party or us.
        </p>
      </>
    )
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Last updated: October 2026. Please read these terms carefully before using our services.",
    body: (
      <>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          By accessing and using this website and its services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">2. Provision of Services</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          TravelLIGHT is constantly innovating in order to provide the best possible experience for its users. You acknowledge and agree that the form and nature of the services which TravelLIGHT provides may change from time to time without prior notice to you.
        </p>
        
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">3. Limitation of Liability</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          In no event shall TravelLIGHT, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>
      </>
    )
  },
  cookies: {
    title: "Cookie Policy",
    subtitle: "Last updated: October 2026. How and why we use cookies on our platform.",
    body: (
      <>
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">1. What are cookies?</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">2. How we use cookies</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device for a set period of time or until you delete them).
        </p>
        
        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">3. Managing cookies</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
        </p>
      </>
    )
  }
}

export function LegalPage({ type }: { type: 'privacy' | 'terms' | 'cookies' }) {
  const content = contentMap[type]

  return (
    <div>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      
      <main className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate prose-lg max-w-none">
            {content.body}
          </div>
        </div>
      </main>
    </div>
  )
}
