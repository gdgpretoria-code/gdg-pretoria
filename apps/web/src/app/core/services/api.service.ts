import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  async get<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('gdg_token');
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
    return res.json();
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const token = localStorage.getItem('gdg_token');
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `API Error ${res.status}`);
    }
    return res.json();
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const token = localStorage.getItem('gdg_token');
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`API Error ${res.status}`);
    return res.json();
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<any>(null);
  token = signal<string | null>(localStorage.getItem('gdg_token'));

  constructor(private api: ApiService) {
    if (this.token()) {
      this.fetchProfile();
    }
  }

  async fetchProfile() {
    try {
      const res: any = await this.api.get('/auth/me');
      this.currentUser.set(res.user);
    } catch {
      this.logout();
    }
  }

  async login(email: string, password: string) {
    const res: any = await this.api.post('/auth/login', { email, password });
    localStorage.setItem('gdg_token', res.token);
    this.token.set(res.token);
    this.currentUser.set(res.user);
    return res.user;
  }

  async register(data: any) {
    const res: any = await this.api.post('/auth/register', data);
    localStorage.setItem('gdg_token', res.token);
    this.token.set(res.token);
    this.currentUser.set(res.user);
    return res.user;
  }

  logout() {
    localStorage.removeItem('gdg_token');
    this.token.set(null);
    this.currentUser.set(null);
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'ADMIN';
  }
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode = signal<boolean>(true);

  constructor() {
    const saved = localStorage.getItem('gdg_theme');
    if (saved === 'light') {
      this.setTheme(false);
    } else {
      this.setTheme(true);
    }
  }

  toggleTheme() {
    this.setTheme(!this.isDarkMode());
  }

  private setTheme(dark: boolean) {
    this.isDarkMode.set(dark);
    localStorage.setItem('gdg_theme', dark ? 'dark' : 'light');
    if (dark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
}
