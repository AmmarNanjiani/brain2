# brain2

Django REST API and a React frontend for a self hosted "second brain".

API to manage higlights and annotations in books, and a frontend to display the data in a useful way.



The API can be used however you want, but it is designed to work with data from [KOReader](https://github.com/koreader/koreader), [Calibre](https://github.com/kovidgoyal/calibre) and this [KOReader Calibre Plugin](https://git.sr.ht/~harmtemolder/koreader-calibre-plugin).

[This code](https://github.com/AmmarNanjiani/KOReader-Calbre-Sidecar-Parser) can be used to parse the data from Calibre and the plugin.

# Demo
Demo frontend: [my-brain2.herokuapp.com](https://my-brain2.herokuapp.com)
API Documentation and Demo Endpoint: [my-brain2.herokuapp.com/brain2_api/](https://my-brain2.herokuapp.com/brain2_api/)


# Usage

Make sure you have docker and docker-compose installed.

## Initial setup:
1) Open a command line to the root of the project and enter `docker-compose up --build'

2) Navigate to [localhost:3000](localhost:3000) to access the frontend, and [localhost:8000](localhost:3000) to read the API documentation.

3) (Optional) populate the data in the API by syncing with Calibre using [this code](https://github.com/AmmarNanjiani/KOReader-Calbre-Sidecar-Parser).

## Regular usage:

Run `docker-compose up`, and navigate to [localhost:3000](localhost:3000) when you want to browse your notes.

## Feature Roadmap
- Make UI responsive to display cleanly on mobile.
- Sync with Calibre directly from the frontend rather than relying on an external script.
- Creating and deleting notes and books.
- An option to view notes by tag rather than by book
- Tag manager page
- Functionality to link notes to other notes in the frontend to define "mind map" style connections. Backend functionality for this technically exists already.
- Mind map visualization
- Add support for other types of content.
  - Articles by integrating with [Wallabag](https://github.com/wallabag/wallabag)
  - Podcasts maybe? Would need a way to quickly capture audio snippets, and then convert them to text. [AntennaPod](https://antennapod.org/) is a good open source podcast app but it doesn't currently have the functionality to support this. However, there is an inactive pull request which would add something that could work: https://github.com/AntennaPod/AntennaPod/pull/5068
  - Tweets
  - Videos
  - Random Scrap Notes
