<template>
  <div class="smallerMain">
    <h2>Installing Cemu (macOS)</h2>

    <p>To run Cemu on macOS, you can download the <a href="https://github.com/cemu-project/Cemu/actions/workflows/build_check.yml?query=branch%3Amain+" target="_blank">latest build</a> from the Cemu GitHub. Note that this requires you to be logged into a GitHub account; if you do not have one, you can compile it from source by following the instructions on the <a href="https://github.com/cemu-project/Cemu/blob/main/BUILD.md" target="_blank">BUILD.md</a> page.</p>
    <p>Once you have downloaded the binary, open a Terminal and run <code>chmod +x /path/to/Cemu</code> to mark it as an executable.</p>
    <p>I recommend that you move the Cemu binary into a folder of its own, as it will then generate a bunch of extra folders and files necessary for Cemu.</p>


    <h3 style="margin-bottom: 0;">Troubleshooting</h3>
    <hr>

    <p><b>No sound:</b> By default, Cemu on macOS sets audio output to 0%. Go into the audio settings and turn up the volume.</p>
    <p><b>Illegal hardware instruction</b>: Make you have moltenvk installed (<code>brew install moltenvk</code>). If you're running an arm based machine, you may need to install it with x64 brew. Also check graphics settings and ensure the rendering API is set to Vulkan.</p>
  </div>
</template>