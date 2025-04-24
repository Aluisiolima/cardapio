import { fetchApi } from "./req";


export async function calcFrete(id: number): Promise<string | void | null> {
  
    if (!navigator.geolocation) {
      console.error("Geolocalização não é suportada pelo navegador.");
      return;
    }
  
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            const dates = {
              lat: latitude,
              lon: longitude,
            };
  
            const frete = await fetchApi<{ frete: string }>(dates, "POST", `/calcFrete/${id}`);
            resolve(frete?.frete);
          } catch (error) {
            console.error("Erro ao calcular frete:", error);
            reject(error);
          }
        },
        (error: GeolocationPositionError) => {
          console.error("Erro ao obter localização:", error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 1000000,
          maximumAge: 0,
        }
      );
    });
  }