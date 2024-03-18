import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HomeArticlePanel } from "~/components/home/article-panel";
import { HomeLandingPanel } from "~/components/home/landing-panel";
import { HomeProjectPanel } from "~/components/home/project-panel";
import { RootNavBar } from "~/components/navbar/root-navbar";

export default component$(() => {
  return (
    <>
      <RootNavBar sticky />
      <div class="w-full divide-y">
        <div class="bg-gray-100">
          <HomeLandingPanel />
        </div>
        <HomeArticlePanel />
        <HomeProjectPanel />
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
