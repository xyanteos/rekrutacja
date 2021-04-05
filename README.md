# My take on the recruitment task
### What was the task
> The task is to create a simple web page that displays a map and several points (pins) on the map and updates it in real time. The points/pins positions can be served by a dead simple Node.Js backend. It is to simulate a tracking mechanism for several objects moving across a path e.g. a fleet of cars in an organization.


1. Each point/pin on the map should move in a random direction according to updates triggered by the backend (The direction can be random). Every point should include a label which lets us identify it (The label can be e.g. the point/pin id generated by the backend).
2. There should be a list of pins/points displayed on the side of the map with all labels and last coordinates.
3. It should be possible to filter which pins/points are displayed with a search box visible on top of the map.


## How to launch
 - Clone the repository
 - Open downloaded repo in IDE
 - Open IDE terminal
 - Navigate to backend folder
 - Type ```npm install```
 - Type ```npm start```
 - Open new terminal instance
 - Navigate to frontend folder
 - Type ```npm install```
 - Type ```npm start```

### Features

- Interactive map component
- Self-updating pointers with random values
- List of checkboxes to de/select pointers you want to render
- Searchbox added for ease of pointers list navigation
- Filtering reversal used for reversing the "selected" components

## License

**No License**
