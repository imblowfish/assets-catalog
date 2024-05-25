import { useCallback, useRef } from "preact/compat";
import { Button } from "$/components/Button.tsx";
// import { Divider } from "$/components/Divider.tsx";
import { Input } from "$/components/Input.tsx";
import {
  AtIcon,
  EyeIcon,
  // GithubIcon,
  // GitlabIcon,
  // GoogleIcon,
} from "$/components/Icons.tsx";
import { HttpCode } from "$/data/http_codes.ts";

export const Registration = () => {
  const inputEmailRef = useRef<HTMLInputElement | null>(null);
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);
  const inputUsernameRef = useRef<HTMLInputElement | null>(null);

  const onSubmitCallback = useCallback(async () => {
    if (
      !inputEmailRef.current ||
      !inputPasswordRef.current ||
      !inputUsernameRef.current
    ) {
      throw new Error("Can't get all necessary data to submit");
    }

    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    const username = inputUsernameRef.current.value;

    const resp = await fetch(
      "http://localhost:8000/api/v0.1/auth/registration",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}:${username}`)}`,
        },
      }
    );

    if (resp.status !== HttpCode.Created) {
      throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
    }
  }, []);

  return (
    <div
      class="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center">
          <p class="text-4xl">Create an account</p>
        </div>
        {/* <div class="flex justify-center items-center flex-col gap-2">
          <Divider>CONTINUE WITH</Divider>
          <div class="flex flex-col gap-1 w-full">
            <Button startIcon={<GoogleIcon />}>Google</Button>
            <Button startIcon={<GithubIcon />}>Github</Button>
            <Button startIcon={<GitlabIcon />}>Gitlab</Button>
          </div>
        </div> */}
        <div class="flex flex-col gap-1 items-center">
          {/* <Divider>OR</Divider> */}
          <form
            class="flex flex-col w-full gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitCallback()
                .then(() => {
                  globalThis.location.href = "/auth/login";
                })
                .catch((err) => {
                  throw err;
                });
            }}
          >
            <Input
              ref={inputEmailRef}
              required
              type="email"
              placeholder="Email"
              endIcon={<AtIcon />}
            />
            <Input
              ref={inputPasswordRef}
              required
              type="password"
              placeholder="Password"
              endIcon={<EyeIcon />}
            />
            <Input
              ref={inputUsernameRef}
              required
              type="text"
              name="username"
              placeholder="Username"
            />
            <div class="flex flex-col mt-2">
              <Button type="submit">Create an account</Button>
            </div>
            <p class="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                class="text-black font-medium hover:underline"
                href="/auth/login"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
