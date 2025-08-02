export class ApiError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Neovlašćen pristup.') {
    super(message);
    this.name = 'UnauthorizedError';

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default class ApiService {
  private static readonly BASE_URL = 'http://localhost:3000/';

  private static buildHeaders(headers?: Record<string, string>, includeJson = false): HeadersInit {
    const defaultHeaders: Record<string, string> = includeJson
      ? { 'Content-Type': 'application/json' }
      : {};
    return {
      ...defaultHeaders,
      ...(headers || {}),
    };
  }

  static async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.buildHeaders(headers),
    });
    if (response.status === 401) throw new UnauthorizedError();
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(errorData.error || 'Internet zahtev nije uspeo.', errorData.details);
    }
    return response.json();
  }

  static async post<T>(endpoint: string, data: any, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.buildHeaders(headers, true),
      body: JSON.stringify(data),
    });
    if (response.status === 401) throw new UnauthorizedError();
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(errorData.error || 'Internet zahtev nije uspeo.', errorData.details);
    }
    return response.json();
  }

  static async put<T>(endpoint: string, data: any, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.buildHeaders(headers, true),
      body: JSON.stringify(data),
    });
    if (response.status === 401) throw new UnauthorizedError();
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(errorData.error || 'Internet zahtev nije uspeo.', errorData.details);
    }
    return response.json();
  }

  static async delete(endpoint: string, headers?: Record<string, string>): Promise<void> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.buildHeaders(headers),
    });
    if (response.status === 401) throw new UnauthorizedError();
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(errorData.error || 'Internet zahtev nije uspeo.', errorData.details);
    }
  }

  static async patch<T>(endpoint: string, data: any, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.buildHeaders(headers, true),
      body: JSON.stringify(data),
    });
    if (response.status === 401) throw new UnauthorizedError();
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(errorData.error || 'Internet zahtev nije uspeo.', errorData.details);
    }
    return response.json();
  }
}