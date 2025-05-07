import Container from "@/components/Container";

export default async function LessonsPage() {
  const res = await fetch("http://localhost:1337/api/lessons?populate=*");
  if (!res.ok) {
    throw new Error("Failed to fetch lessons");
  }
  const json = await res.json();
  const lessons = json.data || [];

  return (
    <Container>
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Все уроки</h1>
        <ul className="text-xl space-y-4">
          {lessons.map((lesson: any) => (
            <li key={lesson.id}>
              <a href={`/lessons/${lesson.slug}`} className="hover:underline">
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
