<template>
  <section class="landing-page markdown-brand">
    <header class="hero">
      <img src="/qmarkdown-logo.svg" alt="QMarkdown Logo" class="hero-logo" />
      <h1 class="hero-title">QMarkdown</h1>

      <div class="row justify-center">
        <p class="hero-subtitle">
          {{ siteConfig.description }}
        </p>
      </div>

      <div class="hero-buttons">
        <router-link
          to="/getting-started/introduction"
          class="hero-button q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--rounded q-btn--dense"
        >
          <div
            class="row justify-around items-center q-btn__content text-center col items-center q-anchor--skip"
            style="width: 120px"
          >
            <div>Get Started</div>
            <q-icon :name="biArrowRightCircle" />
          </div>
        </router-link>

        <a
          href="https://github.com/quasarframework/quasar-ui-qmarkdown/tree/v3-beta"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-button q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--rounded q-btn--dense"
        >
          <div
            class="row justify-around items-center q-btn__content text-center col items-center q-anchor--skip"
            style="width: 120px"
          >
            <q-icon :name="fabGithub" class="q-mr-sm" />
            GitHub Repo
          </div>
        </a>
      </div>
    </header>

    <div class="byline">
      <p>
        Add Markdown content to Quasar applications with syntax highlighting, examples, and
        documentation-friendly rendering.
      </p>
    </div>

    <div class="landing-page__preview">
      <q-img
        src="/qmarkdown--interactive-editor.png"
        alt="QMarkdown interactive editor preview"
        class="shadow-10 rounded-borders"
        fit="contain"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { fabGithub } from "@quasar/extras/fontawesome-v6";
import { biArrowRightCircle } from "@quasar/extras/bootstrap-icons";
import siteConfig from "../../siteConfig";
</script>

<style lang="scss" scoped>
.landing-page {
  color: #263238;
}

.hero {
  background: linear-gradient(135deg, $brand-primary, $brand-secondary);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.hero-logo {
  max-width: 200px;
  margin-bottom: 20px;
  border-radius: 28%;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1.1;
  font-weight: 700;
  margin: 0;
  padding: 0.2em 0;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
  max-width: 660px;
  font-size: 1.2em;
  line-height: 1.4;
  font-weight: 700;
  margin: 0;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.hero-button {
  background: white;
  color: $brand-primary;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.hero-button:hover {
  background: #f0f0f0;
}

.byline {
  text-align: center;
  font-size: 1.2em;
  margin: 20px auto;
  max-width: 760px;
  color: #35495e;
  padding: 0 20px;
}

body.body--dark .byline {
  color: #f0f0f0;
}

.landing-page__preview {
  max-width: 760px;
  margin: 0 auto;
  padding: 8px 20px 64px;

  :deep(.q-img) {
    width: 100%;
  }
}
</style>
