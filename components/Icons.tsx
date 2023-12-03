import IconAt from "icons/at.tsx";
import IconBrandGithub from "icons/brand-github.tsx";
import IconBrandGitlab from "icons/brand-gitlab.tsx";
import IconBrandGoogle from "icons/brand-google.tsx";
import IconEye from "icons/eye.tsx";
import IconSearch from "icons/search.tsx";

const defaultStyle = "h-5";

export const AtIcon = () => {
  return <IconAt class={defaultStyle} />;
};

export const GithubIcon = () => {
  return <IconBrandGithub class={defaultStyle} />;
};

export const GitlabIcon = () => {
  return <IconBrandGitlab class={defaultStyle} />;
};

export const GoogleIcon = () => {
  return <IconBrandGoogle class={defaultStyle} />;
};

export const EyeIcon = () => {
  return <IconEye class={defaultStyle} />;
};

export const SearchIcon = () => {
  return <IconSearch class={defaultStyle} />;
};
