---
title: "WPF Controls: Form controls"
tags: [c#, controls, form-controls, wpf]
---

This post covers some of the most common controls found in forms.

All controls where the user can input data have by default the <a href="https://brunolm.wordpress.com/2015/03/01/data-binding/" title="Data Binding" target="_blank">binding set to two-way mode</a>. It means bound data will be updated on the source if the user change values on the screen (given that the model <a href="https://brunolm.wordpress.com/2015/03/05/nuget-package-fody/" title="Nuget Package: Fody" target="_blank">implements INotifyPropertyChanged</a>).

<a href="https://brunolm.files.wordpress.com/2015/03/2015-36-11-01-36-31-906.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-36-11-01-36-31-906.png" alt="2015-36-11 01-36-31-906" width="412" height="331" class="alignnone size-full wp-image-254" /></a>
<!--more-->

<h2>Button</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.button(v=vs.110).aspx" target="_blank">Button control</a> is a `ContentControl` which means you have to set the `Content` property of it in order to display some text.

```xml
<Button Content="Click me!" />
```

By being a `ContentControl` it also means that it can contain anything, not just text. This allows you to create, for example, a button with an image.

```xml
<Button Command="{Binding AddCommand}">
    <StackPanel>
        <Image Source="/Treant;component\Imgs\SmallAdd.png" />
        <Label Content="_Add" />
    </StackPanel>
</Button>
```

<a href="https://brunolm.files.wordpress.com/2015/03/2015-06-11-01-06-41-636.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-06-11-01-06-41-636.png" alt="2015-06-11 01-06-41-636" width="138" height="42" class="alignnone size-full wp-image-246" /></a>

A button has events that you can subscribe to, the most common one is the click event.

<a href="https://brunolm.files.wordpress.com/2015/03/btnclick.jpg"><img src="https://brunolm.files.wordpress.com/2015/03/btnclick.jpg" alt="btnclick" width="420" height="71" class="alignnone size-full wp-image-250" /></a>

And then you can generate a handler for it. However in MVVM you will want to <a href="https://brunolm.wordpress.com/2015/03/01/icommand-and-relaycommand/" title="ICommand and RelayCommand" target="_blank">bind button actions to an ICommand</a>.

```xml
<Button Content="Click me"
        Command="{Binding ClickMeCommand}"
        CommandParameter=""
/>
```

See also <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.repeatbutton(v=vs.110).aspx" target="_blank">RepeatButton</a> and <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.togglebutton(v=vs.110).aspx" target="_blank">ToggleButton</a>.

<h2>CheckBox</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.checkbox%28v=vs.110%29.aspx" target="_blank">CheckBox control</a> allows you to check/uncheck and "half-check". You can set IsThreeState to it and handle a third checkbox state (`null` value).

```xml
<CheckBox Content="CheckBox"
          IsThreeState="True"
          IsChecked="{Binding MyNullableBoolProperty}"
          />
```

<h2>ComboBox</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.combobox%28v=vs.110%29.aspx" target="_blank">ComboBox control</a> allows you to bind a list of objects that are going to be available to select. And by binding `SelectedItem` you can get the selected object on your model.

```xml
<ComboBox
    ItemsSource="{Binding MyObservableCollection}"
    SelectedItem="{Binding MySelectedItem}" />
```

<h2>Label</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.label%28v=vs.110%29.aspx" target="_blank">Label control</a> is a control that allows you to display some text. If the control gets disabled it will be grayed out (while a TextBlock will not).

The label control has a special feature that allows you to specify an access key:

```xml
<Label Content="La_bel" />
```

<h2>PasswordBox</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.passwordbox%28v=vs.110%29.aspx" target="_blank">PasswordBox control</a> allows you to mask the user input. It also stores the input into a <a href="https://msdn.microsoft.com/en-us/library/system.security.securestring%28v=vs.110%29.aspx" target="_blank">SecureString</a> object.

The password is not bindable. To be able to read the password the user entered you need a different approach. The easiest way is to send the password control as a parameter in a command, for example:

```xml
<PasswordBox x:Name="passwordBox"
             PasswordChar="×" />

<Button Content="Log in"
        Command="{Binding LoginCommand}"
        CommandParameter="{Binding ElementName=passwordBox}" />
```

And then on the button execute method cast the parameter to a `PasswordBox` and get the property `Password` from it.

<h2>RadioButton</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.radiobutton%28v=vs.110%29.aspx" target="_blank">RadioButton control</a> allows you to give some options but only one from the same `GroupName` will be selectable at a time.

```xml
<RadioButton Content="RB" GroupName="X"
             IsChecked="True"
             />
<RadioButton Content="RB2" GroupName="X" />
<RadioButton Content="RB3" GroupName="Y"
             IsChecked="True"
             />
```

<h2>TextBlock</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.textblock%28v=vs.110%29.aspx" target="_blank">TextBlock control</a> is a control that allows you to display some text. If the control gets disabled it will <u>not</u> be grayed out (while a Label will).

```xml
<TextBlock Text="TextBlock" />
```

<h2>TextBox</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.textbox%28v=vs.110%29.aspx" target="_blank">TextBox control</a> allows the user to input values.

```xml
<TextBox Text="{Binding Name}" />
```

To allow multiple lines you have to set `AcceptsReturn` to true.

<h2>Slider</h2>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.slider%28v=vs.110%29.aspx" target="_blank">Slider control</a> allows you to select a numeric value through a slider.

```xml
<Slider Minimum="0" Maximum="100"
    Value="{Binding MyDoubleSliderValue}" />
```
