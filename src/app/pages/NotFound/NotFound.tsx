import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { fetchApi } from '../../utils/req';
import { Load } from '../../components/Load/Load';
import { Empresa } from '../../types/Empresa.type';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const [data, setData] = useState<Empresa[] | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi<Empresa[]>(null, 'GET', '/empresa/');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  function reload(id: number) {
    navigate(`/${id}`);
  }

  if (!data) {
    return <Load />;
  }

  return (
    <div className="container">
      {data?.map((empresa) => (
        <div
          className="card_notFound"
          onClick={() => reload(empresa.id_empresa)}
          key={empresa.id_empresa}
        >
          <p>{empresa.nome_empresa}</p>
        </div>
      ))}
    </div>
  );
};
