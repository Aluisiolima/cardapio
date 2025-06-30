import { ResponseApi } from '../types/Response.type';

/**
 * Sends an HTTP request to the specified API endpoint using the given method and request body.
 *
 * @param data - The request body, can be an array or null.
 * @param method - The HTTP method to use (e.g., "GET", "POST", "PUT", "DELETE").
 * @param url - The URL of the API endpoint.
 * @returns A `ResponseApi` object containing the response from the API.
 *
 * @throws Throws an error if the request fails or the response cannot be parsed.
 *
 * @example
 * const response = await fetchApi([{ name: "John" }], "POST", "/api/users");
 */
export async function fetchApi<T>(
  data: any | null,
  method: string,
  url: string
): Promise<T | null> {
  try {
    const startTime = Date.now();
    const token = sessionStorage.getItem('token');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const apiKey = process.env.REACT_APP_LINK_API;

    const response = await fetch(`${apiKey}${url}`, options);

    const result: ResponseApi<T> = await response.json();

    log({
      method,
      uri: url,
      startTime,
      status: response.status,
    });

    if (result.error) {
      console.log(result.message);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    throw error;
  }
}

interface Log {
  method: string;
  uri: string;
  startTime: number;
  status: number;
}

function log(data: Log): void {
  const { method, uri, startTime, status } = data;
  const discordWebhookUrl: string = process.env.REACT_APP_DISCORD_WEBHOOK_URL || '';

  let color = 0x2ecc71;

  if (status >= 400 && status < 600) {
    color = 0xe74c3c;
  } else if (status >= 300) {
    color = 0xf1c40f;
  }

  const payload = {
    username: 'Efast Cardapio logs',
    avatar_url: 'https://example.com/avatar.png',
    embeds: [
      {
        color: color,
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: '🔀 Método',
            value: method,
            inline: true,
          },
          {
            name: '📁 URI',
            value: uri,
            inline: true,
          },
          {
            name: '📟 Status',
            value: String(status),
            inline: true,
          },
          {
            name: '⏱️ Tempo de execução',
            value: `${((Date.now() - startTime) / 1000).toFixed(3)} ms`,
            inline: true,
          },
        ],
      },
    ],
  };

  fetch(discordWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => {
      console.log('Log enviado com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao enviar log:', error);
    });
}
