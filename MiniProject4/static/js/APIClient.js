class APIClient {

  async logIn(username) {
    const response = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  }

  async getHowls() {
    const authToken = localStorage.getItem('token');
    const response = await fetch(`/api/howls`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch howls');
    }

    return await response.json();
  }

  async postHowl(howlContent) {
    const authToken = localStorage.getItem('token');
    const response = await fetch(`/api/howls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ text: howlContent })
    });

    if (!response.ok) {
      throw new Error('Failed to post howl');
    }

    return await response.json();
  }

  getCurrentUser() {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      window.location.href = '/login';
      return;
    }

    const decodedToken = jwt_decode(authToken);
    return decodedToken.username;
  }
}

const apiClient = new APIClient('');

export default apiClient;