# Hydra Viewer

A small, static Instagram profile-photo preview and downloader. It works entirely in the browser with a **direct, publicly accessible HTTPS image URL** supplied by the user. It does not retrieve Instagram profile pages, access private accounts, bypass platform restrictions, or send images to a server.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or dependencies are required.

## Use

1. Obtain a direct image URL for a public image you have permission to use.
2. Paste the URL into the form and select **Preview image**.
3. Select **Download image**. If the image host does not allow cross-origin downloads, open the image in a new tab and use the browser's save option.

The preview requires the source host to allow browser image loading. Downloading via the button additionally requires the host to permit CORS. The app does not collect or store the provided URL or image.

## Deploy

This is a static site and can be hosted on GitHub Pages or any static hosting provider. Publish the repository root; `index.html` is the entry point.

## Responsible use

Only use public images you are authorized to save. Respect the image owner's rights and Instagram's terms. This tool is not affiliated with or endorsed by Instagram.
