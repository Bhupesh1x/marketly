import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TenantCart {
  productIds: string[];
}

interface CartStore {
  tenantCart: Record<string, TenantCart>;
  addProductToCart: (tenantSlug: string, productId: string) => void;
  removeProductFromCart: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      tenantCart: {},
      addProductToCart: (tenantSlug, productId) =>
        set((state) => ({
          tenantCart: {
            ...(state.tenantCart || []),
            [tenantSlug]: {
              productIds: [
                ...(state?.tenantCart?.[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),
      removeProductFromCart: (tenantSlug, productId) =>
        set((state) => ({
          tenantCart: {
            ...state.tenantCart,
            [tenantSlug]: {
              productIds:
                state?.tenantCart?.[tenantSlug]?.productIds?.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        })),
      clearCart: (tenantSlug) =>
        set((state) => ({
          tenantCart: {
            ...state?.tenantCart,
            [tenantSlug]: {
              productIds: [],
            },
          },
        })),
      clearAllCarts: () => set({ tenantCart: {} }),
      getCartByTenant: (tenantSlug) =>
        get()?.tenantCart?.[tenantSlug]?.productIds || [],
    }),
    {
      name: "marketly-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
