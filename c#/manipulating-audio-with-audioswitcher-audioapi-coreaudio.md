---
title: Manipulating audio with AudioSwitcher.AudioApi.CoreAudio
tags: [audioswitcher-audioapi, c#, core-audio-api]
---

The <a href="https://www.nuget.org/packages/AudioSwitcher.AudioApi.CoreAudio/" target="_blank">AudioSwitcher.AudioApi.CoreAudio</a> nuget package allows you to easily manipulate audio devices.

[code]
Install-Package AudioSwitcher.AudioApi.CoreAudio
[/code]

To mute/unmute my microphone I can use this library to access my capture devices and change their state. A <a href="https://github.com/brunolm/ToggleMic" target="_blank">full example can be found on my Github</a>.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-40-19-01-40-48-226.png"><img class="alignnone wp-image-306 size-thumbnail" src="https://brunolm.files.wordpress.com/2015/03/2015-40-19-01-40-48-226.png?w=150" alt="" width="150" height="150" /></a> <a href="https://brunolm.files.wordpress.com/2015/03/2015-40-19-01-40-57-970.png"><img class="alignnone size-thumbnail wp-image-305" src="https://brunolm.files.wordpress.com/2015/03/2015-40-19-01-40-57-970.png" alt="2015-40-19 01-40-57-970" width="150" height="150" /></a>
<!--more-->

To access my devices I need to create a <code>CoreAudioController</code> and from it I have access to methods that handles everything else. I can use <code>GetCaptureDevices</code> to get all my capture devices, but in this case I only want the default and active one.

[code language="csharp"]
public CoreAudioController Controller { get; }
    = new CoreAudioController();

public CoreAudioDevice MicDevice
{
    get
    {
        return Controller
            .GetCaptureDevices(DeviceState.Active)
            .FirstOrDefault(o => o.IsDefaultDevice);
    }
}
[/code]

Having the device I can call the <code>Mute</code> method. It requires a parameter to tell if the device should be muted or unmuted:

[code language="csharp"]
MicDevice.Mute(true);  // mute
MicDevice.Mute(false); // unmute
[/code]

For <a href="https://github.com/xenolightning/AudioSwitcher" target="_blank">more information on this API you can check their Github</a>.
