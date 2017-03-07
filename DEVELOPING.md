<!---
Copyright Cameron Westland

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## Development on react-slot-fill

### Installation

1. Install [NodeJS](https://nodejs.org).
2. In the repo directory, run `npm i` command to install the required npm packages.
4. Run `npm start` - to start development server

### Build & Test

| Command          | Description                         |
| ---------------- | -----------------------------------  |
| `npm start`      | runs dev server                     |
| `npm run build`  | runs production build of demos      |
| `npm test`       | runs tests suite                    |

## Repository Layout
<pre>
  src/             - Top level packages which publish to npm go here
      demo/        - todo
        advanced/  - advanced example
        simple/    - simple example
      lib/         - main library directory
        index.js   - primary library entry point
      index.js     - demo entry point
  docs/            - documentation
  examples/        - example Orion projects
</pre>
