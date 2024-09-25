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
  admin: {
    users: "/admin/users",
    userDetail: (id: number) => `/admin/users/${id}`,
    lessons: "/admin/lessons",
    lessonDetail: (id: string) => `/admin/lessons/${id}`,
    addLesson: "/admin/lessons/add",
  },
};
