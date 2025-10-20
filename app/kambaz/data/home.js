export const homeScreens = courses.map(course => ({
  id: course.id,
  name: course.name,
  code: course.code,
  instructor: course.instructor,
  announcements: course.home.announcements,
}));
