class APIClient {
  async logIn(username, password) {
    const response = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include' // Ensure cookies are sent with the request
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // No need to store the token in localStorage as it is handled by the server in a secure HTTP-only cookie
    return data;
  }

  async logout() {
    console.log('Logging out');
    const response = await fetch(`/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Ensure cookies are sent with the request
    });
    console.log('Response:', response);

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return await response.json();
  }

  async getUserInfo() {
    const response = await fetch(`/api/users/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Ensure cookies are sent with the request
    });
    console.log('Response:', response);

    if (!response.ok) {
      console.log('Failed to fetch user info');
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    // console.log('User info:', data);
    return data;
  }

  async getHowls() {
    // const authToken = localStorage.getItem('token');
    // const response = await fetch(`/api/howls`, {
    //   headers: {
    //     'Authorization': `Bearer ${authToken}`
    //   }
    // });
    const response = await fetch(`/api/howls`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Ensure cookies are sent with the request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch howls');
    }

    return await response.json();
  }

  async postHowl(howlContent) {
    // const authToken = localStorage.getItem('token');
    const response = await fetch(`/api/howls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${authToken}`
      },
      credentials: 'include', // Ensure cookies are sent with the request
      body: JSON.stringify({ text: howlContent })
    });

    if (!response.ok) {
      throw new Error('Failed to post howl');
    }

    return await response.json();
  }

  async getCurrentUser() {
    try {
      const userInfo = await this.getUserInfo();
      return userInfo.username;
    } catch (error) {
      window.location.href = '/login';
      return;
    }
  }
}

export default new APIClient();