export const api = {
  login: async (email: string, password: string) => {
    const res = await fetch("http://127.0.0.1:3000/api/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Giriş başarısız");
    }

    return res.json(); // { token: "..." }
  },

  getCalisans: async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:3000/api/v1/calisans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Yetkisiz erişim");
    }

    return res.json();
  },
};
