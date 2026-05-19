import { fabGithub, fabXTwitter } from "@quasar/extras/fontawesome-v6";
import { slugify } from "@md-plugins/shared";
import type { MenuItem } from "@md-plugins/vite-md-plugin";
import { version } from "../../../ui/package.json";

const repoBranch = "v3-beta";
const productName = "QMarkdown";

export interface SocialLink {
  name: string;
  icon: string;
  path: string;
  external?: boolean;
}

export interface SiteMenuItem extends MenuItem {
  about?: string;
  expanded?: boolean;
  external?: boolean;
  children?: SiteMenuItem[];
  separator?: boolean;
  header?: string;
  mq?: number;
  extract?: string;
  image?: string;
  maxWidth?: string;
}

export interface LinksConfig {
  primaryHeaderLinks: SiteMenuItem[];
  secondaryHeaderLinks: SiteMenuItem[];
  moreLinks: SiteMenuItem[];
  footerLinks: SiteMenuItem[];
  socialLinks: SocialLink[];
}

export interface LogoConfig {
  showLogo: boolean;
  logoLight: string;
  logoDark: string;
  logoAlt: string;
}

export interface VersionConfig {
  showTitle: boolean;
  showVersion: boolean;
  showOnHeader: boolean;
  showOnSidebar: boolean;
}

export interface UIConfig {
  usePrimaryHeader: boolean;
  useSecondaryHeader: boolean;
  headerHeightHint: number;
  useMoreLinks: boolean;
  useFooter: boolean;
  useSidebar: boolean;
  useToc: boolean;
}

export interface CopyrightConfig {
  line1: string;
  line2: string;
}

export interface LicenseConfig {
  label: string;
  link: string;
}

export interface PrivacyConfig {
  label: string;
  link: string;
}

export interface SiteConfig {
  lang: string;
  title: string;
  description: string;
  theme: string;
  version: string;
  copyright: CopyrightConfig;
  githubEditRootSrc: string;
  license: LicenseConfig;
  privacy: PrivacyConfig;
  logoConfig: LogoConfig;
  versionConfig: VersionConfig;
  config: UIConfig;
  links: LinksConfig;
  sidebar: SiteMenuItem[];
}

function getSidebarPath(item: SiteMenuItem): string {
  if (item.external === true) {
    return item.path ?? slugify(item.name);
  }

  const path = item.path?.replace(/^\/+/, "").split("/").filter(Boolean).pop();
  return path ?? slugify(item.name);
}

function processMenuItem(item: SiteMenuItem): SiteMenuItem {
  return {
    name: item.name,
    path: getSidebarPath(item),
    icon: item.icon,
    iconColor: item.iconColor,
    rightIcon: item.rightIcon,
    rightIconColor: item.rightIconColor,
    external: item.external,
    expanded: item.expanded ?? false,
    children: item.children ? item.children.map(processMenuItem) : undefined,
  };
}

const socialLinks = {
  name: "Social",
  mq: 1400,
  children: [
    {
      name: "GitHub",
      icon: fabGithub,
      path: `https://github.com/quasarframework/quasar-ui-qmarkdown/tree/${repoBranch}`,
      external: true,
    },
    {
      name: "X (Twitter)",
      icon: fabXTwitter,
      path: "https://twitter.com/jgalbraith64",
      external: true,
    },
  ],
};

const docsMenus: SiteMenuItem[] = [
  {
    name: "All About QMarkdown",
    mq: 470,
    children: [
      { name: "What is QMarkdown", path: "/all-about-qmarkdown/what-is-qmarkdown" },
      { name: "Installation Types", path: "/all-about-qmarkdown/installation-types" },
    ],
  },
  {
    name: "Developing",
    mq: 600,
    children: [{ name: "Using QMarkdown", path: "/developing/using-qmarkdown" }],
  },
  {
    name: "Contributing",
    mq: 760,
    children: [
      { name: "Overview", path: "/contributing/overview" },
      { name: "Call to Action", path: "/contributing/call-to-action" },
      { name: "Bugs and Feature Requests", path: "/contributing/bugs-and-feature-requests" },
      { name: "Documentation", path: "/contributing/documentation" },
      { name: "Components", path: "/contributing/components" },
      { name: "Sponsor", path: "/contributing/sponsor" },
    ],
  },
  {
    name: "Latest News",
    mq: 900,
    children: [
      { name: "Changelog", path: "/latest-news/changelog" },
      { name: "Roadmap", path: "/latest-news/roadmap" },
    ],
  },
  {
    name: "Help",
    mq: 1020,
    children: [
      {
        name: "GitHub",
        icon: fabGithub,
        path: "https://github.com/quasarframework/quasar-ui-qmarkdown",
        external: true,
      },
      {
        name: "X (Twitter)",
        icon: fabXTwitter,
        path: "https://twitter.com/jgalbraith64",
        external: true,
      },
      { name: "FAQ", path: "/help/faq" },
      { name: "Contact Us", path: "/help/contact-us" },
    ],
  },
];

const processedMenus = docsMenus.map((menu) => ({
  name: menu.name,
  path: slugify(menu.name),
  expanded: menu.expanded ?? false,
  children: menu.children ? menu.children.map(processMenuItem) : [],
}));

export const moreLinks: SiteMenuItem[] = [
  {
    name: "More",
    children: [...docsMenus, socialLinks],
  },
];

export const sidebar = processedMenus;

const config: SiteConfig = {
  lang: "en-US",
  title: productName,
  description: "Inline markdown for Vue and Quasar applications",
  theme: "doc",
  version,
  copyright: {
    line1: `Copyright © 2019-${new Date().getFullYear()} Jeff Galbraith`,
    line2: "",
  },
  githubEditRootSrc: `https://github.com/quasarframework/quasar-ui-qmarkdown/edit/${repoBranch}/packages/docs/src`,
  license: {
    label: "MIT License",
    link: `https://github.com/quasarframework/quasar-ui-qmarkdown/blob/${repoBranch}/LICENSE.md`,
  },
  privacy: {
    label: "Contact",
    link: "/help/contact-us",
  },
  logoConfig: {
    showLogo: true,
    logoLight: "/icons/favicon-128x128.png",
    logoDark: "/icons/favicon-128x128.png",
    logoAlt: "QMarkdown Logo",
  },
  versionConfig: {
    showTitle: true,
    showVersion: true,
    showOnHeader: false,
    showOnSidebar: true,
  },
  config: {
    usePrimaryHeader: false,
    useSecondaryHeader: true,
    headerHeightHint: 55,
    useMoreLinks: true,
    useFooter: true,
    useSidebar: true,
    useToc: true,
  },
  links: {
    primaryHeaderLinks: [],
    secondaryHeaderLinks: [...docsMenus],
    moreLinks,
    footerLinks: [
      {
        name: socialLinks.name,
        children: [...socialLinks.children],
      },
    ],
    socialLinks: [...socialLinks.children],
  },
  sidebar,
};

export { sidebar as menu };
export default config;
