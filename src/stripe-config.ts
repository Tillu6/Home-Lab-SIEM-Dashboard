export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: string;
  currency: string;
  features: string[];
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SdR4rNyWoviUPD',
    priceId: 'price_1RiACXIbUkg8C9An4IgPMw3y',
    name: 'Home Lab SIEM Dashboard - AI-Powered Security Operations Center',
    description: 'Complete SIEM solution with real-time threat detection, network monitoring, incident response, and advanced analytics for home labs and small enterprises.',
    mode: 'payment',
    price: 'A$20.00',
    currency: 'AUD',
    features: [
      'Real-time threat detection and monitoring',
      'Advanced network topology visualization',
      'Comprehensive incident response management',
      'MITRE ATT&CK framework integration',
      'Interactive security analytics dashboard',
      'Automated alert system with severity classification',
      'Device discovery and management',
      'Traffic analysis and protocol monitoring',
      'Threat intelligence feeds integration',
      'Customizable security playbooks',
      'Export capabilities for reports and data',
      'Mobile-responsive design',
      'Lifetime access and updates'
    ]
  }
];

export function getProductById(id: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.id === id);
}

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}