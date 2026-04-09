import React from 'react';
import { Package, Tag, Building2, CircleDollarSign } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="glass p-5 hover:bg-white/[0.08] transition-colors duration-300 group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            {product.productName}
          </h3>
          <p className="text-white/60 flex items-center gap-1.5 mt-1 text-sm">
            <Building2 className="w-4 h-4" /> 
            {product.supplier_id?.name || 'Unknown Supplier'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 px-3 py-1 rounded-full flex items-center gap-1">
          <CircleDollarSign className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">${product.price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex gap-3 text-sm">
        <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-white/80">
          <Tag className="w-4 h-4 text-secondary" />
          {product.category}
        </span>
        <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/80">
          Qty: <strong className="text-white">{product.quantity}</strong>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
