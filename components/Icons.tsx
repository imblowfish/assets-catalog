import IconAt from "icons/at.tsx";
import IconBrandGithub from "icons/brand-github.tsx";
import IconBrandGitlab from "icons/brand-gitlab.tsx";
import IconBrandGoogle from "icons/brand-google.tsx";
import IconChevronDown from "icons/chevron-down.tsx"
import IconEye from "icons/eye.tsx";
import IconPin from "icons/pin.tsx";
import IconPinFilled from "icons/pin-filled.tsx";
import IconPlus from "icons/plus.tsx"
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

export const ChevronDownIcon = () => {
  return <IconChevronDown class={defaultStyle} />;
}

export const PinIcon = () => {
  return <IconPin class={defaultStyle} />;
};

export const PinIconFilled = () => {
  return <IconPinFilled class={defaultStyle} />;
};

export const EyeIcon = () => {
  return <IconEye class={defaultStyle} />;
};

export const PlusIcon = () => {
  return <IconPlus class={defaultStyle} />;
}

export const SearchIcon = () => {
  return <IconSearch class={defaultStyle} />;
};
