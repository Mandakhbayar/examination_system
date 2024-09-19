export const Routes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  public: {
    home: "/",
  },
  private: {
    lessons: "/lessons",
    questions: (id: string) => `/lessons/${id}`,
  },
  admin: {},
};
