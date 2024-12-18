import { supabase } from './supabase';

interface UpdateStockItem {
  id: string;
  quantity: number;
}

export const updateProductStock = async (items: UpdateStockItem[]) => {
  try {
    // Update each product's stock
    for (const item of items) {
      // First get the current quantity
      const { data: currentProduct, error: fetchError } = await supabase
        .from('products')
        .select('quantity')
        .eq('id', item.id)
        .single();

      if (fetchError) throw fetchError;
      if (!currentProduct) throw new Error('Product not found');

      // Then update with the new quantity
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          quantity: currentProduct.quantity - item.quantity 
        })
        .eq('id', item.id);

      if (updateError) throw updateError;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating stock:', error);
    return { success: false, error };
  }
};
