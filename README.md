# Roami (Pre-Alpha)

**Roami** is the ultimate travel inspriation assitant. This smart little buddy can grab trip ideas from social media posts, websites, magazine articles, even voice notes! They'll then tag and save your new bucket-list item and help you plan the ultimate getaway 🧳🛫

This repo is for developers interested in the Roami source code, architecture, and contributing fixes and features. For general info about Roami and how to get the app, check out the Roami website (coming soon).

## Background and goals

Roami was started by [Adam Westbrook](https://www.github.com/adamdodev) in 2025. The goal was to not only create a convenient, automated, day-to-day app for collecting travel inspiration, but to also create a real-world use case to discuss the following:

- Assess the state of on-device AI capabilities in modern smartphones, and how they can be used to improve privacy and reduce costs.
- Assess and promote [local-first development](https://localfirstweb.dev/) practices.
- Acknowledge user fatigue with subscription-based revenue services, and understand the alternatives.
- Understand the capabilities and limitations of GitHub Copilot in upskilling engineers to new languages and tech stacks.

Inspired in part by the book [Tiny Experiments](https://uk.bookshop.org/p/books/tiny-experiments-create-a-life-of-discovery-to-think-better-work-smarter-and-live-happier-anne-laure-le-cunff/7696101?ean=9781800819153), the development of Roami will be open and interactive. It is hoped that this will help foster and contextualise the discussions above 🙂.

# Current status

Roami is still very much in Pre-Alpha. None of the major features are complete and the codebase is extremely non-final.

As this is my first React Native / Expo / TinyBase development project, many of the folders and files are scratchpads and examples from various guides and docs. These will be tidied up as functionality and code is finalized, but in the spirit of openness they will remain here for now as record of the journey. The general "final" structure however, is detailed below:

# Structure

## Folders

`/roami` - Expo app directory. All other top level folders are scratch projects and tests and will be eventually removed.

`/roami/app` - Main app folder using Expo Router.

`/roami/<assets,components,constants,hooks,scripts>` - Self explanatory resources but mostly filled with Expo app boilerplate currently. Resources currently defined in the app pages for ease will eventually be moved here for cleanliness.

## Branches

During Alpha development, releases will be cut directly from `main`. Eventually, release branches will be created for RCs for distrubution and testing.

# Local dev

See the [Expo app README](./roami) and [Expo docs](https://docs.expo.dev/tutorial/create-your-first-app/) for instructions on setting up a dev environment. Expo Go is currently used for local testing, using both the Web and iOS versions.

# Tests

There are none, YOLO baby...

In all seriousness, some guidance on best practices here would be helpful.

# Builds and distribution

EAS will be used to build and distribute development builds using Test Flight on iOS, Android distribution plan is still TBD. For the foreseeable future there will be no Web distribution created beyond local testing for convenience, this will hopefully change once I have some capcity to dive into running models client-side in a browser.

# Contributing

All comments, issues, pull requests, suggestions and berations are welcome. There will be no formal contribution guide until the project is closer to Beta.
