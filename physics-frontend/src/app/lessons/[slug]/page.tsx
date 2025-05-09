import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default async function LessonPage(props: { params: { slug: string } }) {
  const { slug } = props.params;
  const queryParams = new URLSearchParams();
  queryParams.set("populate", "*");
  queryParams.set("filters[slug][$eq]", slug);
  const url = `http://localhost:1337/api/lessons?${queryParams.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    return notFound();
  }
  const json = await res.json();
  const lesson = json.data?.[0];
  if (!lesson) {
    return notFound();
  }

  const { title, blocks, section } = lesson;

  // Формируем оглавление урока на основе заголовков блоков
  const toc = (blocks || [])
    .filter((block: any) => block.heading)
    .map((block: any) => ({
      id: `block-${block.id}`,
      title: block.heading.replace(/<[^>]+>/g, ""),
    }));

  return (
    <Container>
      <div className="flex flex-col md:flex-row max-w-4xl w-full mx-auto">
        {/* Навигация для мобильных */}
        {toc.length > 0 && (
          <nav className="block md:hidden w-full mb-4 overflow-x-auto">
            <ul className="flex space-x-4 px-2">
              {toc.map((item: { id: string; title: string }) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="whitespace-nowrap text-blue-600 hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Боковое меню навигации по содержимому для десктопа */}
        {toc.length > 0 && (
          <aside className="hidden md:block w-60 flex-shrink-0 sticky top-24 self-start mr-8">
            <nav className="bg-white p-4 rounded-lg shadow-lg">
              <strong className="block mb-2 text-lg text-gray-800">
                Содержание
              </strong>
              <ul className="space-y-2 text-sm">
                {toc.map((item: { id: string; title: string }) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-blue-600 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Основной контент */}
        <main className="flex-1">
          <h1 className="text-5xl font-bold mb-6 text-center md:text-left">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {title}
            </ReactMarkdown>
          </h1>

          {section && (
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
              Раздел:{" "}
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {section.name}
              </ReactMarkdown>
            </h2>
          )}

          {blocks?.map((block: any) => (
            <div key={block.id} id={`block-${block.id}`} className="mb-10">
              {block.heading && (
                <h3 className="text-2xl font-semibold mb-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {block.heading}
                  </ReactMarkdown>
                </h3>
              )}

              {block.content && (
                <div className="prose text-lg mb-6 mx-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {block.content}
                  </ReactMarkdown>
                </div>
              )}

              {block.image && block.image.url && (
                <div className="mb-6 flex justify-center">
                  <Image
                    src={block.image.url}
                    alt={block.image.alternativeText || "Block image"}
                    width={600}
                    height={360}
                    className="rounded-lg shadow"
                  />
                </div>
              )}

              {block.htmlCode && (
                <div
                  className="html-code mb-6"
                  dangerouslySetInnerHTML={{ __html: block.htmlCode }}
                />
              )}
            </div>
          ))}
        </main>
      </div>
    </Container>
  );
}
