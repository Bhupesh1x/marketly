import { useShallow } from "zustand/react/shallow";

import { useCartStore } from "../store/useCartStore";

export function useCart({ tenantSlug }: { tenantSlug: string }) {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  const productIds = useCartStore(
    useShallow((state) => state?.tenantCart?.[tenantSlug]?.productIds || [])
  );

  function toogleProduct(productId: string) {
    if (productIds?.includes(productId)) {
      removeProductFromCart(tenantSlug, productId);
    } else {
      addProductToCart(tenantSlug, productId);
    }
  }

  function isProductInCart(productId: string) {
    return productIds?.includes(productId);
  }

  function clearTenantCart() {
    clearCart(tenantSlug);
  }

  return {
    productIds,
    addProduct: (productId: string) => addProductToCart(tenantSlug, productId),
    removeProduct: (productId: string) =>
      removeProductFromCart(tenantSlug, productId),
    clearCart: clearTenantCart,
    clearAllCarts,
    toogleProduct,
    isProductInCart,
    totalItems: productIds?.length || 0,
  };
}
