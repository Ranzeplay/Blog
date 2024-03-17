import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ArticleCard } from "~/components/article/card";
import { RootNavBar } from "~/components/navbar/root-navbar";
import { emptyArticle } from "~/libs/article";

export default component$(() => {
  const demoArticle = emptyArticle;
  demoArticle.title = "Article title";
  demoArticle.publishTime = new Date();

  return (
    <>
      <RootNavBar sticky />
      <div class="w-full bg-gray-100 divide-y">
        <div class="h-screen mx-auto max-w-screen-lg flex flex-col justify-center gap-y-4">
          <div class="flex flex-col gap-y-2">
            <h1 class="text-3xl font-bold text-nowrap">Jeb Feng</h1>
            <h4 class="text-lg text-nowrap">仰观宇宙之大</h4>
          </div>
          <div class="flex flex-row gap-x-4">
            <p>2 posts</p>
            <p>12 projects</p>
          </div>
        </div>
        <div class="bg-white w-full">
          <div class="min-h-screen flex flex-row justify-between mx-auto max-w-screen-lg">
            <div class="flex self-center">
              <h1 class="text-3xl font-bold">Latest articles</h1>
            </div>
            <div class="flex flex-col gap-y-8 self-center">
              <ArticleCard article={demoArticle} />
              <div class="w-96 h-24 bg-black"></div>
              <div class="w-96 h-24 bg-black"></div>
            </div>
          </div>
        </div>
        <div class="bg-white w-full">
          <div class="min-h-screen flex flex-row justify-between mx-auto max-w-screen-lg">
            <div class="flex flex-col gap-y-8 self-center">
              <div class="w-96 h-24 bg-black"></div>
              <div class="w-96 h-24 bg-black"></div>
              <div class="w-96 h-24 bg-black"></div>
            </div>
            <div class="flex self-center">
              <h1 class="text-3xl font-bold">Projects</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home - Blog",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
