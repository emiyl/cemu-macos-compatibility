# Cemu macOS Compatibility

Unofficial list of compatibility with the macOS builds of [Cemu](https://github.com/cemu-project/Cemu). You can view this list at [cemu.emiyl.com](https://cemu.emiyl.com/)

## Contributing

You can contribute by submitting a PR to edit a `.json` file in the `tests/` direction. Each title uses the following format:

```js

{
  "name": "Zelda Wind Waker HD",  // Title name
  "region": "EUR",                // Title region
  "titleID": "0005000010143600"   // Title ID
  "comment": "Note on any requirements or recommendations to run this title"
  "tests": [                      // Compatibility test array (this is covered below)
    {
      "rating": 4.5,
      "comment": "...",
      ...
    },
    {
      ...
    }
  ]
}
```

The "tests" property is an array to store the information regarding your experience running that title. It is formatted like so:

```js
{
    "rating": 5, // Rate the game's performance and stability out of 5, more information on this below
    "comment": "Write about how the game runs, where it crashes, if it performs well, if there are any unexpected glitches, etc.",
    "source": "Write your name here, or someone else's name if you are getting the information from somewhere else.",
    "sourceURL": "https://github.com/yourGitHubName", // This can also be a link to your own profile, or a link to where you got the information
    "author": "Your name",
    "date": "2022-09-25", // Change this to the current date
    "version": "2.0-4", // Your Cemu version. If applicable, include extra information such as the commit number
    "hardware": "MacBook Air (M1, 7-GPU, 8GB)", // Include your device and any properties relevant to performance
    "osVersion": "macOS 13.0 beta 8 (22A5352e)", // Your macOS version and build number
    "renderingApi": "Vulkan on MoltenVK v1.2", // The rendering API used when testing
    "log": "Paste any relevant logs here that may be useful for diagnosing issues"
}
```

### Ratings

1. Crashes when booting/infinite black screen
2. Game loads, but crashes in title screen/menu/in-game
3. Starts, maybe runs well, but major glitches/issues prevent game from being completed
4. Game can be played through with minor audio or graphical glitches
5. Game can be played with no issues
