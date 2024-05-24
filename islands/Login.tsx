import { Button } from "$/components/Button.tsx";
import { Divider } from "$/components/Divider.tsx";
import { Input } from "$/components/Input.tsx";
import {
  AtIcon,
  EyeIcon,
  GithubIcon,
  GitlabIcon,
  GoogleIcon,
} from "$/components/Icons.tsx";

export const Login = () => {
  return (
    <div
      class="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center">
          <p class="text-4xl">Welcome back!</p>
        </div>
        <div class="flex justify-center items-center flex-col gap-2">
          <Divider>CONTINUE WITH</Divider>
          <div class="flex flex-col gap-1 w-full">
            <Button startIcon={<GoogleIcon />}>Google</Button>
            <Button startIcon={<GithubIcon />}>Github</Button>
            <Button startIcon={<GitlabIcon />}>Gitlab</Button>
          </div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <Divider>OR</Divider>
          <div class="flex flex-col w-full gap-2">
            <Input
              type="email"
              placeholder="Email"
              endIcon={<AtIcon />}
            />
            <Input
              type="password"
              placeholder="Password"
              endIcon={<EyeIcon />}
            />
            <div class="flex flex-col mt-2">
              <Button>Login</Button>
            </div>
            <p class="text-sm text-gray-600">
              No account yet?{" "}
              <a
                class="text-black font-medium hover:underline"
                href="/auth/registration"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
