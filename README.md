# Floppa's New Tab

A Floppa-themed widget board for your new tab

![Widget Board](images/floppa_widget_board.png)

## Widgets

Click and drag a widget's title bar to move it. Click and drag the dots in the
bottom right corner of a widget to resize it.
Minimize widgets by clicking the - button, reset their size by clicking the
square, or close them by clicking the X. Closed widgets can be reopened by
clicking on the icon in the taskbar.

### Search

Select a search engine, type your query, and press enter to search.

### To do List

Add new todos and check off completed ones.
You can edit todos by clicking the pencil icon.
Make your changes and press enter to submit, or the escape key to cancel.
Reorder by pressing the arrows icon and then the up or down arrows on your keyboard. Click the icon again or press enter or escape to stop moving.

Todos are stored in localStorage,
so clearing cache or site data will delete them.

### Daily quote

A random quote every day. Click on the refresh button to get a new quote. Click
on the upload button to upload a JSON with custom quotes:

```
[
  {
    "quote": "...",
    "author": "..."
  },
  ...
]
```

Like Todos, these are
stored in localStorage, so make sure to keep a backup.

### Text notes

Add any text note to your new tab with a custom title.

Also in local storage. Keep a backup.

### Images

Add nice cat images or GIFs for your new tab.

### Theme selector

Choose a cat inspired color theme for your widgets. Pick between light and dark
modes.

## Dev Setup

1. `npm install --force`
2. `npm run build`
3. In Firefox, go to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
4. In the Temporary Extensions section, click on Load Temporary Add-on...
5. Select `build/manifest.json`
