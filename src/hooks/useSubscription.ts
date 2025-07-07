import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

interface Subscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
  product?: {
    name: string;
    description: string;
    price: string;
  };
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSubscription(null);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        // Enrich with product information
        const product = data.price_id ? getProductByPriceId(data.price_id) : null;
        
        setSubscription({
          ...data,
          product: product ? {
            name: product.name,
            description: product.description,
            price: product.price,
          } : undefined,
        });
      } else {
        setSubscription(null);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const hasActiveSubscription = () => {
    return subscription?.subscription_status === 'active' || 
           subscription?.subscription_status === 'trialing';
  };

  const hasPurchased = () => {
    return subscription !== null;
  };

  return {
    subscription,
    isLoading,
    error,
    hasActiveSubscription: hasActiveSubscription(),
    hasPurchased: hasPurchased(),
    refetch: fetchSubscription,
  };
}