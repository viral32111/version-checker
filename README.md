# Version Checker

[![CI](https://github.com/viral32111/version-checker/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/viral32111/version-checker/actions/workflows/ci.yml)
[![CodeQL](https://github.com/viral32111/version-checker/actions/workflows/codeql.yml/badge.svg)](https://github.com/viral32111/version-checker/actions/workflows/codeql.yml)
![GitHub tag (with filter)](https://img.shields.io/github/v/tag/viral32111/version-checker?label=Latest)
![GitHub repository size](https://img.shields.io/github/repo-size/viral32111/version-checker?label=Size)
![GitHub release downloads](https://img.shields.io/github/downloads/viral32111/version-checker/total?label=Downloads)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/viral32111/version-checker?label=Commits)

A JSON HTTP API running on [Cloudflare Workers](https://workers.cloudflare.com) that returns versions of [supported software](#supported-software) filterable via [query parameters](#query-parameters).

## Usage

Send HTTP `GET` requests to the API base URL: `https://versions.viral32111.dev` (alias of worker URL: `https://version-checker.workers.viral32111.dev`).

An example of fetching PHP 8.x releases that are at least a month old.

```bash
$ curl -s 'https://versions.viral32111.dev/php?match=8&age=30d' | jq
[
  {
    "version": "8.3.0",
    "stable": true,
    "support": {
      "lts": false,
      "eol": false
    }
    "changelog": "https://www.php.net/ChangeLog-8.php#8.3.0",
    "sources": {
      "github": "https://github.com/php/php-src/tree/php-8.3.0"
    }
    "downloads": {
      "gz": {
        "url": "https://www.php.net/distributions/php-8.3.0.tar.gz",
        "signature": "https://www.php.net/distributions/php-8.3.0.tar.gz.asc",
        "checksums": {
          "sha256": "557ae14650f1d1984d3213e3fcd8d93a5f11418b3f8026d3a2d5022251163951"
        }
      },
      "bz2": {
        "url": "https://www.php.net/distributions/php-8.3.0.tar.bz2",
        "signature": "https://www.php.net/distributions/php-8.3.0.tar.bz2.asc",
        "checksums": {
          "sha256": "de67d0833d42b196e5a66fa1a332f45e296cbe8e9472e9256b2a071c34dc5ed6"
        }
      },
      "xz": {
        "url": "https://www.php.net/distributions/php-8.3.0.tar.xz",
        "signature": "https://www.php.net/distributions/php-8.3.0.tar.xz.asc",
        "checksums": {
          "sha256": "1db84fec57125aa93638b51bb2b15103e12ac196e2f960f0d124275b2687ea54"
        }
      }
    }
  },
  {
    "version": "8.2.12",
    ...
  },
  ...
]
```

## Supported Software

The name of the software should be appended to the API base URL as the path.

| Name | Path | Notes |
| ---- | ---- | ----- |
| [Alpine Linux](https://alpinelinux.org) | `/alpine` | |
| [Ubuntu](https://ubuntu.com) | `/ubuntu` | |
| [Apache HTTPd](https://httpd.apache.org) | `/httpd` | |
| [PHP](https://php.net) | `/php` | |
| [Composer](https://getcomposer.org) | `/composer` | The `for` parameter checks against PHP. |
| [Node.js](https://nodejs.org) | `/node` | |
| [NPM](https://npmjs.com) | `/npm` | The `for` parameter checks against Node.js. |
| [Yarn](https://yarnpkg.com) | `/yarn` | The `for` parameter checks against Node.js. |
| [.NET Core Runtime](https://dotnet.microsoft.com) | `/dotnet` | |
| [ASP.NET Core Runtime](https://dotnet.microsoft.com) | `/aspdotnet` | |
| [Java](https://jdk.java.net) | `/java` | |
| [Python](https://python.org) | `/python` | |
| [PIP](https://pypi.org) | `/pip` | The `for` parameter checks against Python. |
| [Go](https://go.dev) | `/go` | |

## Query Parameters

These should be passed as [standard query-string parameters](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL#parameters) after the `software` path.

| Parameter | Type | Default | Description | Notes |
| --------- | ---- | ----------- | ----- |
| `min` | Semantic Version | | Greater than **or** equal to the given version. | |
| `max` | Semantic Version | | Less than **or** equal to the given version. | |
| `match` | Semantic Version | | Equal to the given semantic version. | |
| `for` | Semantic Version | All | Compatible with the given semantic version. | Only applicable to software that depends on another (e.g., package managers). |
| `age` | Duration | `0s` | Only permit versions older than the given duration. | Value is an integer suffixed by a unit (e.g., `30m`, `6h`, `5d`). The default is `0s`. |
| `stable` | Boolean | Both | Toggle between stable or non-stable (i.e., beta, alpha) versions. | Defaults to both possibilities when not given. |
| `lts` | Boolean | Both | Toggle between long-term support (LTS) and short-term support (STS) versions. | Defaults to both possibilities when not given. |
| `eol` | Boolean | Both | Toggle between active and end-of-life (EoL) versions. | Defaults to both possibilities when not given. |

Semantic versions (`semver`) values may be partial (i.e., `1`, `1.2`, `1.2.3`).

## ⚖️ License

Copyright (C) 2023 [viral32111](https://viral32111.com).

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see https://www.gnu.org/licenses.
