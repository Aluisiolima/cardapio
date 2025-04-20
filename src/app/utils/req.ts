import { ResponseApi } from "../types/Response.type";

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
export async function fetchApi<T>(data: [] | null, method: string, url: string): Promise<T | null> {
    try {

        const token = sessionStorage.getItem("token");

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        };

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

        if (result.error) {
            console.log(result.message);
            return null;
        }

        return result.data;

    } catch (error) {
        console.error("Erro ao chamar a API:", error);
        throw error;
    }
}