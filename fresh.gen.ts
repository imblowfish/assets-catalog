// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_v0_1_auth_login from "./routes/api/v0.1/auth/login.ts";
import * as $api_v0_1_auth_logout from "./routes/api/v0.1/auth/logout.ts";
import * as $api_v0_1_auth_registration from "./routes/api/v0.1/auth/registration.ts";
import * as $api_v0_1_user_username_ from "./routes/api/v0.1/user/[username].ts";
import * as $api_v0_1_user_username_assets from "./routes/api/v0.1/user/[username]/assets.ts";
import * as $api_v0_1_user_username_file_filename_ from "./routes/api/v0.1/user/[username]/file/[filename].ts";
import * as $api_v0_1_user_username_files from "./routes/api/v0.1/user/[username]/files.ts";
import * as $api_v0_assets from "./routes/api/v0/assets.ts";
import * as $api_v0_assets_assetId_ from "./routes/api/v0/assets/[assetId].ts";
import * as $api_v0_storage from "./routes/api/v0/storage.ts";
import * as $api_v0_storage_filename_ from "./routes/api/v0/storage/[filename].ts";
import * as $assets_assetId_ from "./routes/assets/[assetId].tsx";
import * as $auth_login from "./routes/auth/login.tsx";
import * as $auth_registration from "./routes/auth/registration.tsx";
import * as $index from "./routes/index.tsx";
import * as $new_asset from "./routes/new/asset.tsx";
import * as $user_username_ from "./routes/user/[username].tsx";
import * as $Actions from "./islands/Actions.tsx";
import * as $ActionsButton from "./islands/ActionsButton.tsx";
import * as $AssetView from "./islands/AssetView.tsx";
import * as $FileUploader from "./islands/FileUploader.tsx";
import * as $Login from "./islands/Login.tsx";
import * as $Registration from "./islands/Registration.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/v0.1/auth/login.ts": $api_v0_1_auth_login,
    "./routes/api/v0.1/auth/logout.ts": $api_v0_1_auth_logout,
    "./routes/api/v0.1/auth/registration.ts": $api_v0_1_auth_registration,
    "./routes/api/v0.1/user/[username].ts": $api_v0_1_user_username_,
    "./routes/api/v0.1/user/[username]/assets.ts":
      $api_v0_1_user_username_assets,
    "./routes/api/v0.1/user/[username]/file/[filename].ts":
      $api_v0_1_user_username_file_filename_,
    "./routes/api/v0.1/user/[username]/files.ts": $api_v0_1_user_username_files,
    "./routes/api/v0/assets.ts": $api_v0_assets,
    "./routes/api/v0/assets/[assetId].ts": $api_v0_assets_assetId_,
    "./routes/api/v0/storage.ts": $api_v0_storage,
    "./routes/api/v0/storage/[filename].ts": $api_v0_storage_filename_,
    "./routes/assets/[assetId].tsx": $assets_assetId_,
    "./routes/auth/login.tsx": $auth_login,
    "./routes/auth/registration.tsx": $auth_registration,
    "./routes/index.tsx": $index,
    "./routes/new/asset.tsx": $new_asset,
    "./routes/user/[username].tsx": $user_username_,
  },
  islands: {
    "./islands/Actions.tsx": $Actions,
    "./islands/ActionsButton.tsx": $ActionsButton,
    "./islands/AssetView.tsx": $AssetView,
    "./islands/FileUploader.tsx": $FileUploader,
    "./islands/Login.tsx": $Login,
    "./islands/Registration.tsx": $Registration,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
