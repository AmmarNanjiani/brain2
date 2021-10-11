# brain2-api

Django REST API code for a self hosted "second brain".

The current functionality has models defined for keeping track of books, their authors, notes in the book, and tags for books, as well as tags for notes.

The API can be used however you want, but it is designed to work with data from [KOReader](https://github.com/koreader/koreader), [Calibre](https://github.com/kovidgoyal/calibre) and this [KOReader Calibre Plugin](https://git.sr.ht/~harmtemolder/koreader-calibre-plugin).

[This code](https://github.com/AmmarNanjiani/KOReader-Calbre-Sidecar-Parser) can be used to parse the data from Calibre and the plugin.


# Usage
Make sure you have docker installed.

## Initial setup:
1) Open a command line to the root of the project and enter `docker-compose up --build'

2) Navigate to [localhost:3000](localhost:3000) to access the frontend, and [localhost:8000](localhost:3000) to read the API documentation.

3) (Optional) populate the data in the API by syncing with Calibre using [this code](https://github.com/AmmarNanjiani/KOReader-Calbre-Sidecar-Parser).

## Regular usage:

Run `docker-compose up`, and navigate to [localhost:3000](localhost:3000) when you want to browse your notes.

## Feature Roadmap
- Creating and deleting notes, books, and tags
- An option to view notes by tag rather than by book
- Link notes to other notes to create "mind map" style connections
- Mind map visual
