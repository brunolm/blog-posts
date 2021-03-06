---
title: "Automating keyboard keypress and mouse clicks with AutoIt3"
tags: [autoit3, automation, c#, keyboard]
---

Many years ago I was trying to implement a "turbo controller" for ePSXe (Playstation emulator). I attempted to use `SendKeys` with no luck. Later I heard about `SendInput` which didn't work on the emulator but worked on some other games.

Today, after 5 years or so, while I was browsing Stack Overflow <a href="http://stackoverflow.com/search?page=96&amp;tab=newest&amp;q=%5bc%23%5d%20answers%3a0" target="_blank">unanswered questions for c# page 96</a> I saw this question: <a href="http://stackoverflow.com/q/28393164/340760" target="_blank">Invoke keyboard event in c#</a>

I saw comments saying that he tried SendKeys, SentInput and it didn't work, but then he tried <a href="https://www.autoitscript.com/site/autoit/downloads/" target="_blank">AutoIt3</a> and magic! it worked!
<!--more-->

I downloaded it, installed, created a project and added a reference to:

<blockquote>\Program Files\AutoIt3\AutoItX\AutoItX3.dll</blockquote>

And started coding as fast as I could. It is quite simple actually, you just have to call the <a href="https://www.autoitscript.com/autoit3/docs/functions/Send.htm" target="_blank">Send</a> command.

```csharp
AutoItX3Lib.IAutoItX3 a = new AutoItX3Lib.AutoItX3();

a.Send("{NUMPAD1}");
```

And <a href="https://www.youtube.com/watch?v=EwVDDxoKBk4" target="_blank">YEAH! BITCH! MAGIC! OHH!</a>

It worked, after 5 years!

I highly recommend this software/DLL if you are interested in automating anything, it has tons of methods to manipulate windows, mouse, keyboard.

<hr>

And just for the record, the class I created to use SendInput, which is not so great, but anyway:

```csharp
public class KeyboardManager
{
    public const int INPUT_KEYBOARD = 1;
    public const int KEYEVENTF_KEYUP = 0x0002;

    public struct KEYDBINPUT
    {
        public Int16 wVk;
        public Int16 wScan;
        public Int32 dwFlags;
        public Int32 time;
        public Int32 dwExtraInfo;
        public Int32 __filler1;
        public Int32 __filler2;
    }

    public struct INPUT
    {
        public Int32 type;
        public KEYDBINPUT ki;
    }

    [DllImport("user32")]
    public static extern int SendInput(int cInputs, ref INPUT pInputs, int cbSize);

    public static void HoldKey(Keys vk)
    {
        INPUT input = new INPUT();
        input.type = INPUT_KEYBOARD;
        input.ki.dwFlags = 0;
        input.ki.wVk = (Int16)vk;
        SendInput(1, ref input, Marshal.SizeOf(input));
    }

    public static void ReleaseKey(Keys vk)
    {
        INPUT input = new INPUT();
        input.type = INPUT_KEYBOARD;
        input.ki.dwFlags = KEYEVENTF_KEYUP;
        input.ki.wVk = (Int16)vk;
        SendInput(1, ref input, Marshal.SizeOf(input));
    }

    public static void PressKey(Keys vk)
    {
        HoldKey(vk);
        ReleaseKey(vk);
    }
}
```
