"use client"

import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/uploadModal";
import { useEffect, useState } from "react"
import { ProductWithPrice } from "@/types";


interface ModalProviderProps {
    products: ProductWithPrice[];
  }

  const ModalProvider: React.FC<ModalProviderProps> = ({
    products
  }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <>
        <AuthModal />
        <SubscribeModal products={products} />
        <UploadModal />
      </>
    );
  }
  

export default ModalProvider