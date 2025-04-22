import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { fetchApi } from "../../utils/req";
import { Product } from "../../types/Product.type";
import { Load } from "../Load/Load";

export const Detalhes: React.FC = () => {
    const { id } = useParams();
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduto = async () => {
            try {
                const result = await fetchApi<Product>(null, "GET", `/pegarProduto/${id}`);
                setData(result);
            } catch (error) {
                console.error(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        getProduto();
    }, [id]);

    if (loading) return <Load />;
    return (
        <></>
    );
}