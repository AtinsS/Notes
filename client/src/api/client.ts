const API_BASE = "http://localhost:4000";

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // 1. Читаем ответ как текст
  const text = await response.text();
  
  // 2. Парсим только если есть контент
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  // 3. Обрабатываем ошибки
  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || data?.error || `HTTP Error ${response.status}`;
    throw new Error(message);
  }
  
  return data as T;
}
