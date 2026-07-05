export type ProductCategory = "camera" | "sensor" | "accessory";
export type StepId = "cameras" | "plan" | "sensors" | "protection";

export interface Variant {
  id: string;
  label: string;
  image?: string;
  swatchColor?: string;
  qty: number;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description?: string;
  learnMoreUrl?: string;
  image: string;
  badge?: { label: string };
  compareAtPrice?: number;
  price: number;
  required?: boolean;
  variants?: Variant[];
  qty?: number;
  activeVariantId?: string;
}

export interface PlanOption {
  id: string;
  name: string;
  nameAccent?: string;
  compareAtPrice: number;
  price: number;
  billingPeriod: string;
}

export interface StepConfig {
  id: StepId;
  stepNumber: number;
  title: string;
  icon: string;
  type: "products" | "plan";
  products?: Product[];
  plans?: PlanOption[];
  selectedPlanId?: string;
}

export interface Catalog {
  reviewCopy: { title: string; subtitle: string };
  steps: StepConfig[];
  shipping: { label: string; compareAtPrice?: number; price: number };
  guarantee: { badgeText: string; badgeImage: string; heading: string; body: string };
  financing: { text: string };
}
