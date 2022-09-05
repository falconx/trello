This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Quick start

```bash
yarn # Install dependencies
yarn start # Run the app in dev mode
```

# Deployments

Pushing to the `develop` branch will trigger a deploy to https://trello-nine.vercel.app

# What else you would've added to the project if this was going to be released as a real app?

## Features

* Add an image field for each card to allows users to specify an image to show in the edit modal and card preview
* Add routing support for cards so that each edit modal view is mounted at `/:card-id`
  * Update document title with the card title to improve SEO
* Form validation with error messages
* Enhance reordering
  * Allow for cards to be reordered within a column
  * Allow for columns to be reordered
  * In a real app I would make use of a well-established library for managing the drag and drop behaviour
* User accounts and authentication
  * Assign users to cards
* Checklists
* Search
* Images
* Deadline dates

## Accessibility improvements

* It's currently not possible to reorder cards using only a keyboard — To solve this we could have a dropdown field within the edit modal view which lists all the available column titles and, on selection, reassigns the card `columnId`
* There are lots of a11y considerations for modals, the easiest way to meet these standards is by using [react-modal](https://github.com/reactjs/react-modal)
* It is currently not possible to hide the add card and add list fields using only a keyboard
* Hover/focus styles

## Issues

1. Prevent body scrolling on when modal is present — Mostly an issue on mobile
1. `activeDragCardId` state will unnecessarily be stored in localStorage (See `AppContext.tsx`)

  Not a big deal now but could bloat our local storage when adding more features which require temporary global state.

  We could have a seperate typedef for stored global state and have `activeDragCard` use `useState` instead of `useLocalStorage`.
