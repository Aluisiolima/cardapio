import {
  bebida,
  adicionais,
  artesanais,
  batatinha,
  hamburguer,
  pizza,
  sucos,
} from '../asset/defualt';

export function ImageError(tipo: string, e: React.SyntheticEvent<HTMLImageElement>): void {
  const tiposImgs: Record<string, string> = {
    pizza: pizza,
    hamburguer: hamburguer,
    hambuguer: hamburguer,
    bebida: bebida,
    bebidas: bebida,
    adicionais: adicionais,
    artesanal: artesanais,
    porção: batatinha,
    sucos: sucos,
    default: pizza,
  };
  const tipoSemEspaco = tipo.replace(/\s+/g, '');

  (e.target as HTMLImageElement).src = tiposImgs[tipoSemEspaco] || tiposImgs.default;
}
