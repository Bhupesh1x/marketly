import { useCartStore } from "../store/useCartStore";

export function useCart({ tenantSlug }: { tenantSlug: string }) {
  const {
    addProductToCart,
    clearAllCarts,
    clearCart,
    getCartByTenant,
    removeProductFromCart,
  } = useCartStore();

  const productIds = getCartByTenant(tenantSlug);

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
