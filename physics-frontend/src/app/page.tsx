import Image from "next/image";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">
          Добро пожаловать в мир Физики
        </h1>
        <p className="text-xl mb-8 text-gray-800">
          Изучайте увлекательные уроки, решайте задачи, экспериментируйте в
          интерактивных симуляциях и глубже понимайте законы природы!
        </p>
        <a
          href="/lessons"
          className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          Начать обучение
        </a>
      </div>
      <div className="mt-12">
        <Image
          src="/physics-illustration.png" // файл в папке public
          alt="Physics Illustration"
          width={300}
          height={200}
        />
      </div>
    </Container>
  );
}
