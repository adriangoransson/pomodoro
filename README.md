# Pomodoro time tracker

Simple timer built according to the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) which has been of tremendous help for me to get studying.

I made it because I couldn't find one already that worked well on both mobile and desktop.

## Features

* Responsive, works well on both mobile and desktop devices
* Customizable and using localStorage to save your preferences
* Progressive Web App, accessible offline
* Ticking sound during focus rounds
* Notification when round is over
* Light and dark themes
* Keyboard shortcut (space) to pause/resume
* Fast and "lightweight". Around 30kb gzipped (not including audio or image assets)

## Acknowledgements
* "Tick Tock" sound by FoolBoyMedia on [freesound.org](https://freesound.org/people/FoolBoyMedia/sounds/264498/)
* "Coloured tomato" design by bakar015 on [www.freepik.com](https://www.freepik.com/free-vector/coloured-tomato-design_938844.htm)

## Contributing
This project was scaffolded with [Vue cli](https://cli.vuejs.org/).
Entrypoint: [main.js](./src/main.js) and [App.vue](./src/App.vue).
Most of the logic is kept in the [Vuex store](./src/store).

Airbnb style javascript lint.

| Description                              | Command        |
| ---------------------------------------- | -------------- |
| Project setup                            | `yarn install` |
| Compiles and hot-reloads for development | `yarn serve`   |
| Compiles and minifies for production     | `yarn build`   |
| Lints and fixes files                    | `yarn lint`    |
