import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default async function LessonPage(props: { params: { slug: string } }) {
  const { slug } = await props.params;
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

  return (
    <Container>
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {title}
          </ReactMarkdown>
        </h1>
        {section && (
          <h2 className="text-3xl font-semibold mb-4">
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
          <div key={block.id} className="mb-6">
            {block.heading && (
              <h3 className="text-2xl font-semibold mb-2">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {block.heading}
                </ReactMarkdown>
              </h3>
            )}
            {block.content && (
              <div className="text-lg mb-4">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {block.content}
                </ReactMarkdown>
              </div>
            )}
            {block.image && block.image.url && (
              <Image
                src={block.image.url}
                alt={block.image.alternativeText || "Block image"}
                width={500}
                height={300}
                className="mb-4"
              />
            )}
            {block.htmlCode && (
              <div
                className="html-code"
                dangerouslySetInnerHTML={{ __html: block.htmlCode }}
              />
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
