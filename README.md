# Cemu macOS Compatibility

Unofficial list of compatibility with the macOS builds of Cemu. You can view this list at [cemu.emiyl.com](https://cemu.emiyl.com/)

## Contributing

You can contribute by submitting a PR to edit the `titles.json` file. Each title uses the following format:

```js
{
  "0005000010143600": {             // Title ID
    "name": "Zelda Wind Waker HD",  // Title name
    "region": "EUR",                // Title region
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
}
```

The "tests" property is an array to store the information regarding your experience running that title. It is formatted like so:

```js
{
    "rating": 4.5, // Rate the game's performance and stability out of 5, more information on this below
    "comment": "Write about how the game runs, where it crashes, if it performs well, if there are any unexpected glitches, etc.",
    "source": "Write your name here, or someone else's name if you are getting the information from somewhere else.",
    "sourceURL": "https://github.com/yourGitHubName", // This can also be a link to your own profile, or a link to where you got the information
    "author": "Your name",
    "date": "2022-09-25", // Change this to the current date
    "version": "2.0", // Your Cemu version. If possible, include extra data such as the commit number
    "hardware": "MacBook Air 2020 (M1, 7-GPU, 8GB)", // Include your device and any properties relevant to performance
    "osVersion": "macOS 13.0 beta 8 (22A5352e)", // Your macOS version and build number
    "renderingApi": "Vulkan" // The rendering API used when testing
}
```

### Ratings

1. Crashes when booting/infinite black screen
2. Game loads, but crashes in title screen/menu/in-game
3. Starts, maybe runs well, but major glitches/issues prevent game from being completed
4. Game can be played through with minor audio or graphical glitches
5. Game can be played with no issues
